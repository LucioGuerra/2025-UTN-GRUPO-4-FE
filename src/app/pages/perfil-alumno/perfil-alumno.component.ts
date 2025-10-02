import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { PerfilAlumnoService, PerfilAlumnoDTO, ActualizarPerfilDTO, IdiomaDTO } from '../../services/perfil-alumno.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-perfil-alumno',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './perfil-alumno.component.html',
  styleUrl: './perfil-alumno.component.scss'
})
export class PerfilAlumnoComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  isEditing = false;
  editForm!: FormGroup;
  perfilAlumno: PerfilAlumnoDTO | null = null;
  isLoading = false;
  selectedImageFile: File | null = null;
  selectedCVFile: File | null = null;
  imagePreview: string | null = null;

  nivelesIdioma = ['Básico', 'Intermedio', 'Avanzado', 'Nativo'];
  habilidadesDisponibles = [
    'JavaScript', 'TypeScript', 'Angular', 'React', 'Vue.js', 'Node.js',
    'Python', 'Java', 'C#', 'PHP', 'MySQL', 'PostgreSQL', 'MongoDB',
    'Git', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'HTML', 'CSS',
    'SCSS', 'Bootstrap', 'Tailwind CSS', 'Express.js', 'Spring Boot',
    'Django', 'Flask', 'Laravel', '.NET', 'REST APIs', 'GraphQL'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private perfilService: PerfilAlumnoService,
    private snackBar: MatSnackBar
  ) {
    this.initializeForm();
  }

  private initializeForm() {
    this.editForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],

      carrera: ['', [Validators.required]],
      anio: ['', [Validators.required]],
      universidad: ['', [Validators.required]],

      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      sobreMi: ['', [Validators.maxLength(1000)]],

      linkedin: [''],
      github: [''],

      habilidades: this.formBuilder.array([]),
      idiomas: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    this.cargarPerfil();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private cargarPerfil() {
    this.isLoading = true;
    this.perfilService.getPerfil()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (perfil) => {
          this.perfilAlumno = perfil;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al cargar el perfil:', error);
          this.isLoading = false;
        }
      });
  }

  abrirEnlace(url: string) {
    window.open(url, '_blank');
  }

  descargarCV() {
    try {
      this.perfilService.descargarCV();
    } catch (error) {
      console.error('Error al descargar CV:', error);
    }
  }

  editarPerfil() {
    if (!this.perfilAlumno) return;

    this.isEditing = true;
    this.imagePreview = this.perfilAlumno.imagen;

    this.editForm.patchValue({
      nombre: this.perfilAlumno.nombre,
      apellido: this.perfilAlumno.apellido,
      email: this.perfilAlumno.email,
      telefono: this.perfilAlumno.telefono,
      ubicacion: this.perfilAlumno.ubicacion,
      fechaNacimiento: this.perfilAlumno.fechaNacimiento,
      carrera: this.perfilAlumno.carrera,
      anio: this.perfilAlumno.anio,
      universidad: this.perfilAlumno.universidad,
      descripcion: this.perfilAlumno.descripcion,
      sobreMi: this.perfilAlumno.sobreMi || '',
      linkedin: this.perfilAlumno.linkedin,
      github: this.perfilAlumno.github
    });

    this.setHabilidades(this.perfilAlumno.habilidades);
    this.setIdiomas(this.perfilAlumno.idiomas);
  }

  cancelarEdicion() {
    this.isEditing = false;
    this.selectedImageFile = null;
    this.selectedCVFile = null;
    this.imagePreview = null;

    if (this.perfilAlumno) {
      this.editForm.patchValue(this.perfilAlumno);
      this.setHabilidades(this.perfilAlumno.habilidades);
      this.setIdiomas(this.perfilAlumno.idiomas);
      this.imagePreview = this.perfilAlumno.imagen;
    }
  }

  async guardarCambios() {
    if (this.editForm.valid && this.perfilAlumno) {
      this.isLoading = true;

      try {
        if (this.selectedImageFile) {
          await this.perfilService.subirImagenPerfil(this.selectedImageFile).toPromise();
        }

        if (this.selectedCVFile) {
          await this.perfilService.subirCV(this.selectedCVFile).toPromise();
        }

        const datosActualizados: ActualizarPerfilDTO = {
          ...this.editForm.value,
          habilidades: this.habilidades.value,
          idiomas: this.idiomas.value
        };

        this.perfilService.actualizarPerfil(datosActualizados)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (perfilActualizado) => {
              this.perfilAlumno = perfilActualizado;
              this.isEditing = false;
              this.isLoading = false;
              this.selectedImageFile = null;
              this.selectedCVFile = null;
              this.imagePreview = this.perfilAlumno.imagen;

              this.snackBar.open('Perfil actualizado exitosamente', 'Cerrar', {
                duration: 3000
              });
            },
            error: (error) => {
              console.error('Error al actualizar el perfil:', error);
              this.isLoading = false;
              this.snackBar.open('Error al actualizar el perfil', 'Cerrar', {
                duration: 3000
              });
            }
          });

      } catch (error) {
        console.error('Error al procesar archivos:', error);
        this.isLoading = false;
        this.snackBar.open('Error al procesar archivos', 'Cerrar', {
          duration: 3000
        });
      }
    } else {
      Object.keys(this.editForm.controls).forEach(key => {
        this.editForm.get(key)?.markAsTouched();
      });

      this.habilidades.controls.forEach(control => control.markAsTouched());
      this.idiomas.controls.forEach(group => {
        Object.keys((group as FormGroup).controls).forEach(key => {
          (group as FormGroup).get(key)?.markAsTouched();
        });
      });
    }
  }

  get f() {
    return this.editForm.controls;
  }

  get habilidades(): FormArray {
    return this.editForm.get('habilidades') as FormArray;
  }

  get idiomas(): FormArray {
    return this.editForm.get('idiomas') as FormArray;
  }

  private setHabilidades(habilidades: string[]) {
    const habilidadesArray = this.editForm.get('habilidades') as FormArray;
    habilidadesArray.clear();
    habilidades.forEach(habilidad => {
      habilidadesArray.push(this.formBuilder.control(habilidad, Validators.required));
    });
  }

  agregarHabilidad() {
    this.habilidades.push(this.formBuilder.control('', Validators.required));
  }

  eliminarHabilidad(index: number) {
    this.habilidades.removeAt(index);
  }

  private setIdiomas(idiomas: IdiomaDTO[]) {
    const idiomasArray = this.editForm.get('idiomas') as FormArray;
    idiomasArray.clear();
    idiomas.forEach(idioma => {
      idiomasArray.push(this.formBuilder.group({
        idioma: [idioma.idioma, Validators.required],
        nivel: [idioma.nivel, Validators.required]
      }));
    });
  }

  agregarIdioma() {
    const idiomaGroup = this.formBuilder.group({
      idioma: ['', Validators.required],
      nivel: ['', Validators.required]
    });
    this.idiomas.push(idiomaGroup);
  }

  eliminarIdioma(index: number) {
    this.idiomas.removeAt(index);
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedImageFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.snackBar.open('Por favor selecciona un archivo de imagen válido', 'Cerrar', {
        duration: 3000
      });
    }
  }

  onCVSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedCVFile = file;
      this.snackBar.open('CV seleccionado correctamente', 'Cerrar', {
        duration: 2000
      });
    } else {
      this.snackBar.open('Por favor selecciona un archivo PDF válido', 'Cerrar', {
        duration: 3000
      });
    }
  }
}