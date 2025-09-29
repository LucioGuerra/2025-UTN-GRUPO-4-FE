import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OfertaCardComponent } from '../oferta-card/oferta-card.component';
import { OfertaListaDTO } from '../../models/oferta.dto';
import { OfertasService } from '../../services/ofertas.service';

@Component({
  selector: 'app-ofertas-lista',
  standalone: true,
  imports: [OfertaCardComponent, MatButtonModule, MatIconModule],
  template: `
    <div class="ofertas-container">
      <div class="header">
        <button mat-icon-button (click)="volver()">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <h1>Todas las Ofertas Laborales</h1>
      </div>
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
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
    }
    .header h1 {
      margin: 0;
    }
  `]
})
export class OfertasListaComponent implements OnInit {
  ofertas: OfertaListaDTO[] = [];

  constructor(
    private ofertasService: OfertasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ofertasService.getOfertas().subscribe(ofertas => {
      this.ofertas = ofertas;
    });
  }

  volver(): void {
    this.router.navigate(['/']);
  }
}