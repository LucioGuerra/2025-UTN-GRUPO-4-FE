import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { OfertaListaDTO } from '../../models/oferta.dto';

@Component({
  selector: 'app-oferta-card',
  standalone: true,
  imports: [MatCardModule, MatChipsModule],
  template: `
    <mat-card class="oferta-card" (click)="verDetalle()">
      <mat-card-header>
        <mat-card-title>{{ oferta.titulo }}</mat-card-title>
        <mat-card-subtitle>{{ oferta.locacion }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p><strong>Modalidad:</strong> {{ oferta.modalidad }}</p>
        <p><strong>Pago:</strong> {{ oferta.pagoAprox }}</p>
        <div class="atributos">
          @for (atributo of atributosLimitados; track atributo) {
            <mat-chip>{{ atributo }}</mat-chip>
          }
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .oferta-card {
      cursor: pointer;
      margin: 16px 0;
      transition: box-shadow 0.3s ease;
    }
    .oferta-card:hover {
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    .atributos {
      margin-top: 12px;
    }
    mat-chip {
      margin: 2px;
    }
  `]
})
export class OfertaCardComponent {
  @Input() oferta!: OfertaListaDTO;

  constructor(private router: Router) {}

  get atributosLimitados(): string[] {
    return this.oferta.atributos.slice(0, 5);
  }

  verDetalle(): void {
    this.router.navigate(['/oferta', this.oferta.id]);
  }
}