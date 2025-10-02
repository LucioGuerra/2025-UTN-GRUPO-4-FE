import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { API_URL } from '../app.config';

export interface IdiomaDTO {
    idioma: string;
    nivel: string;
}

export interface PerfilAlumnoDTO {
    id?: number;
    nombre: string;
    apellido: string;
    imagen: string;
    email: string;
    linkedin: string;
    github: string;
    carrera: string;
    anio: string;
    universidad: string;
    descripcion: string;
    sobreMi: string;
    habilidades: string[];
    idiomas: IdiomaDTO[];
    telefono: string;
    ubicacion: string;
    fechaNacimiento: string;
    curriculumUrl: string;
}

export interface ActualizarPerfilDTO {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    ubicacion: string;
    fechaNacimiento: string;
    carrera: string;
    anio: string;
    universidad: string;
    descripcion: string;
    sobreMi: string;
    linkedin: string;
    github: string;
    habilidades: string[];
    idiomas: IdiomaDTO[];
}

@Injectable({
    providedIn: 'root'
})
export class PerfilAlumnoService {
    private perfilSubject = new BehaviorSubject<PerfilAlumnoDTO | null>(null);
    public perfil$ = this.perfilSubject.asObservable();

    private mockPerfil: PerfilAlumnoDTO = {
        id: 1,
        nombre: 'Ariana',
        apellido: 'Wacelinka',
        imagen: 'https://tse2.mm.bing.net/th/id/OIP.5CC9Agv_WNLAAwLXTaSzGAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3',
        email: 'arianawacelinka@alu.frlp.utn.edu.ar',
        linkedin: 'https://www.linkedin.com/in/ariana-wacelinka-652a70208/',
        github: 'https://github.com/ariana-wacelinka/',
        carrera: 'Ingenieria en sistemas de informacion',
        anio: '4to año',
        universidad: 'Universidad Tecnologica Nacional - Facultad Regional La Plata',
        descripcion: 'Estudiante apasionada por el desarrollo de software con experiencia en proyectos académicos y personales. Me especializo en desarrollo web full-stack y tengo particular interés en UX/UI y tecnologías emergentes.',
        sobreMi: 'Soy una persona proactiva, responsable y siempre dispuesta a aprender nuevas tecnologías. Me gusta trabajar en equipo y enfrentar desafíos que me permitan crecer profesionalmente. En mi tiempo libre disfruto de la programación personal, leer sobre nuevas tecnologías y practicar deportes.',
        habilidades: [
            'JavaScript', 'TypeScript', 'Angular', 'React', 'Node.js',
            'Python', 'Java', 'MySQL', 'MongoDB', 'Git', 'Docker'
        ],
        idiomas: [
            { idioma: 'Español', nivel: 'Nativo' },
            { idioma: 'Inglés', nivel: 'Avanzado' },
        ],
        telefono: '+54 9 221 3199796',
        ubicacion: 'La Plata, Buenos Aires',
        fechaNacimiento: '12 de marzo de 2004',
        curriculumUrl: '/assets/documents/WACELINKA, Ariana.pdf'
    };

    constructor(
        private http: HttpClient,
        @Inject(API_URL) private apiUrl: string
    ) {
        this.perfilSubject.next(this.mockPerfil);
    }

    getPerfil(): Observable<PerfilAlumnoDTO> {
        return of({ ...this.mockPerfil });
    }

    actualizarPerfil(datosActualizados: ActualizarPerfilDTO): Observable<PerfilAlumnoDTO> {
        const perfilActualizado = {
            ...this.mockPerfil,
            ...datosActualizados
        };

        this.mockPerfil = perfilActualizado;
        this.perfilSubject.next(perfilActualizado);

        return of(perfilActualizado);
    }

    subirImagenPerfil(archivo: File): Observable<{ imageUrl: string }> {
        const mockImageUrl = 'https://via.placeholder.com/300x300';
        this.mockPerfil.imagen = mockImageUrl;
        this.perfilSubject.next(this.mockPerfil);

        return of({ imageUrl: mockImageUrl });
    }

    subirCV(archivo: File): Observable<{ cvUrl: string }> {
        const mockCvUrl = `/assets/documents/${archivo.name}`;
        this.mockPerfil.curriculumUrl = mockCvUrl;
        this.perfilSubject.next(this.mockPerfil);

        return of({ cvUrl: mockCvUrl });
    }

    descargarCV(): void {
        const perfil = this.perfilSubject.value;
        if (!perfil?.curriculumUrl) {
            console.error('No hay URL de curriculum disponible');
            return;
        }

        const link = document.createElement('a');
        link.href = perfil.curriculumUrl;
        link.download = `CV_${perfil.nombre}_${perfil.apellido}.pdf`;
        link.target = '_blank';

        if (perfil.curriculumUrl.startsWith('http')) {
            window.open(perfil.curriculumUrl, '_blank');
        } else {
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    actualizarHabilidades(habilidades: string[]): Observable<PerfilAlumnoDTO> {
        this.mockPerfil.habilidades = [...habilidades];
        this.perfilSubject.next(this.mockPerfil);

        return of(this.mockPerfil);
    }

    actualizarIdiomas(idiomas: IdiomaDTO[]): Observable<PerfilAlumnoDTO> {
        this.mockPerfil.idiomas = [...idiomas];
        this.perfilSubject.next(this.mockPerfil);

        return of(this.mockPerfil);
    }

    eliminarPerfil(): Observable<{ success: boolean }> {
        this.perfilSubject.next(null);
        return of({ success: true });
    }
}