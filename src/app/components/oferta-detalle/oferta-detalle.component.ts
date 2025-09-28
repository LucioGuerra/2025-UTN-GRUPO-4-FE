import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { OfertaListaDTO } from '../../models/oferta.dto';

@Component({
  selector: 'app-oferta-detalle',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatChipsModule],
  template: `
    @if (oferta) {
      <div class="detalle-container">
        <mat-card>
          <mat-card-header>
            <mat-card-title>{{ oferta.titulo }}</mat-card-title>
            <mat-card-subtitle>{{ oferta.locacion }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p><strong>Modalidad:</strong> {{ oferta.modalidad }}</p>
            <p><strong>Pago aproximado:</strong> {{ oferta.pagoAprox }}</p>
            <p><strong>Descripción:</strong></p>
            <p>{{ oferta.descripcion }}</p>
            <p><strong>Requisitos:</strong></p>
            <p>{{ oferta.requisitos }}</p>
            <div class="atributos">
              <strong>Tecnologías:</strong>
              @for (atributo of oferta.atributos; track atributo) {
                <mat-chip>{{ atributo }}</mat-chip>
              }
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary">Aplicar</button>
            <button mat-button (click)="volver()">Volver</button>
          </mat-card-actions>
        </mat-card>
      </div>
    }
  `,
  styles: [`
    .detalle-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .atributos {
      margin-top: 16px;
    }
    mat-chip {
      margin: 2px;
    }
  `]
})
export class OfertaDetalleComponent implements OnInit {
  oferta?: OfertaListaDTO;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarOferta(id);
  }

  private cargarOferta(id: number): void {
    const ofertas: OfertaListaDTO[] = [
      {
        id: 1,
        titulo: 'Desarrollador Full Stack',
        descripcion: 'Buscamos un desarrollador full stack con experiencia en tecnologías modernas.',
        requisitos: 'Mínimo 3 años de experiencia en Angular y Node.js.',
        modalidad: 'remoto',
        locacion: 'Buenos Aires, Argentina',
        pagoAprox: 'USD 2000-3000',
        atributos: ['Angular', 'Node.js', 'TypeScript', 'MongoDB', 'Docker', 'AWS']
      },
      {
        id: 2,
        titulo: 'Frontend Developer',
        descripcion: 'Desarrollador frontend especializado en React.',
        requisitos: '2+ años de experiencia en React.',
        modalidad: 'híbrido',
        locacion: 'Córdoba, Argentina',
        pagoAprox: 'USD 1500-2500',
        atributos: ['React', 'JavaScript', 'CSS', 'HTML']
      }
    ];
    
    this.oferta = ofertas.find(o => o.id === id);
  }

  volver(): void {
    this.router.navigate(['/ofertas']);
  }
}