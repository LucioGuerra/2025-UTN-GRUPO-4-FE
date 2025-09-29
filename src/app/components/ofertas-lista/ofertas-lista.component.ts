import { Component, OnInit } from '@angular/core';
import { OfertaCardComponent } from '../oferta-card/oferta-card.component';
import { OfertaListaDTO } from '../../models/oferta.dto';
import { OfertasService } from '../../services/ofertas.service';

@Component({
  selector: 'app-ofertas-lista',
  standalone: true,
  imports: [OfertaCardComponent],
  template: `
    <div class="ofertas-container">
      <h1>Todas las Ofertas Laborales</h1>
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

  constructor(private ofertasService: OfertasService) {}

  ngOnInit(): void {
    this.ofertasService.getOfertas().subscribe(ofertas => {
      this.ofertas = ofertas;
    });
  }
}