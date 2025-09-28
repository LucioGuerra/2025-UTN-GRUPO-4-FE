import { Component, OnInit } from '@angular/core';
import { OfertaCardComponent } from '../oferta-card/oferta-card.component';
import { OfertaListaDTO } from '../../models/oferta.dto';

@Component({
  selector: 'app-ofertas-lista',
  standalone: true,
  imports: [OfertaCardComponent],
  template: `
    <div class="ofertas-container">
      <h1>Ofertas Laborales</h1>
      @for (oferta of ofertas; track oferta.id) {
        <app-oferta-card [oferta]="oferta"></app-oferta-card>
      }
    </div>
  `,
  styles: [`
    .ofertas-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
  `]
})
export class OfertasListaComponent implements OnInit {
  ofertas: OfertaListaDTO[] = [];

  ngOnInit(): void {
    this.ofertas = [
      {
        id: 1,
        titulo: 'Desarrollador Full Stack',
        descripcion: 'Desarrollo de aplicaciones web',
        requisitos: 'Angular, Node.js',
        modalidad: 'remoto',
        locacion: 'Buenos Aires, Argentina',
        pagoAprox: 'USD 2000-3000',
        atributos: ['Angular', 'Node.js', 'TypeScript', 'MongoDB', 'Docker', 'AWS']
      },
      {
        id: 2,
        titulo: 'Frontend Developer',
        descripcion: 'Desarrollo de interfaces de usuario',
        requisitos: 'React, JavaScript',
        modalidad: 'híbrido',
        locacion: 'Córdoba, Argentina',
        pagoAprox: 'USD 1500-2500',
        atributos: ['React', 'JavaScript', 'CSS', 'HTML']
      }
    ];
  }
}