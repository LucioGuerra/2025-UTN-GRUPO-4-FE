import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { OfertaCardComponent } from '../oferta-card/oferta-card.component';
import { OfertaListaDTO } from '../../models/oferta.dto';
import { OfertasService } from '../../services/ofertas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatCardModule, MatIconModule, OfertaCardComponent],
  template: `
    <mat-toolbar color="primary">
      <span>UniJobs</span>
      <span class="spacer"></span>
      <button mat-button>Inicio</button>
      <button mat-button (click)="verTodasOfertas()">Ofertas</button>
      <button mat-button>Mi Perfil</button>
    </mat-toolbar>

    <div class="homepage-container">
      <section class="hero-section">
        <mat-card class="hero-card">
          <mat-card-content>
            <h1>Encuentra tu próxima oportunidad laboral</h1>
            <p>Conectamos estudiantes universitarios con las mejores ofertas de trabajo</p>
            <button mat-raised-button color="primary" (click)="verTodasOfertas()">
              Explorar Ofertas
            </button>
          </mat-card-content>
        </mat-card>
      </section>

      <section class="ofertas-destacadas">
        <h2>Ofertas Destacadas</h2>
        <div class="ofertas-grid">
          @for (oferta of ofertasDestacadas; track oferta.id) {
            <app-oferta-card [oferta]="oferta"></app-oferta-card>
          }
        </div>
        <div class="ver-mas">
          <button mat-stroked-button (click)="verTodasOfertas()">
            Ver todas las ofertas
            <mat-icon>arrow_forward</mat-icon>
          </button>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    .homepage-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .hero-section {
      margin-bottom: 40px;
    }
    .hero-card {
      text-align: center;
      padding: 40px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    .hero-card h1 {
      font-size: 2.5rem;
      margin-bottom: 16px;
    }
    .hero-card p {
      font-size: 1.2rem;
      margin-bottom: 24px;
    }
    .ofertas-destacadas h2 {
      margin-bottom: 24px;
      color: #333;
    }
    .ofertas-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
    }
    .ver-mas {
      text-align: center;
    }
    .ver-mas button {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class HomepageComponent implements OnInit {
  ofertasDestacadas: OfertaListaDTO[] = [];

  constructor(
    private ofertasService: OfertasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ofertasService.getOfertas().subscribe(ofertas => {
      this.ofertasDestacadas = ofertas.slice(0, 3);
    });
  }

  verTodasOfertas(): void {
    this.router.navigate(['/ofertas']);
  }
}