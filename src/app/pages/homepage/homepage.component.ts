import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { OfertaCardComponent } from '../../components/oferta-card/oferta-card.component';
import { OfertaListaDTO } from '../../models/oferta.dto';
import { OfertasService } from '../../services/ofertas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, OfertaCardComponent],
  template: `
    <div class="homepage-container">
      <section class="hero-section animate-fade-in">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              Encuentra tu <span class="gradient-text">próxima oportunidad</span> laboral
            </h1>
            <p class="hero-subtitle">
              Conectamos estudiantes universitarios con las mejores ofertas de trabajo en tecnología
            </p>
            <div class="hero-actions">
              <button mat-raised-button class="cta-button" color="primary" (click)="verTodasOfertas()">
                <mat-icon>rocket_launch</mat-icon>
                Explorar Ofertas
              </button>
              <button mat-stroked-button class="secondary-button">
                <mat-icon>info</mat-icon>
                Cómo funciona
              </button>
            </div>
          </div>
          <div class="hero-visual">
            <div class="floating-card card-1">💼</div>
            <div class="floating-card card-2">🚀</div>
            <div class="floating-card card-3">🎆</div>
          </div>
        </div>
      </section>

      <section class="stats-section">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">500+</div>
            <div class="stat-label">Ofertas Activas</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">1200+</div>
            <div class="stat-label">Estudiantes Registrados</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">95%</div>
            <div class="stat-label">Tasa de Éxito</div>
          </div>
        </div>
      </section>

      <section class="ofertas-destacadas">
        <div class="section-header">
          <h2 class="section-title">Ofertas Destacadas</h2>
          <p class="section-subtitle">Las mejores oportunidades seleccionadas para ti</p>
        </div>
        <div class="ofertas-grid">
          @for (oferta of ofertasDestacadas; track oferta.id) {
            <app-oferta-card [oferta]="oferta"></app-oferta-card>
          }
        </div>
        <div class="ver-mas">
          <button mat-raised-button class="view-all-button" (click)="verTodasOfertas()">
            Ver todas las ofertas
            <mat-icon>arrow_forward</mat-icon>
          </button>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .homepage-container {
      min-height: 100vh;
    }
    
    .hero-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 80px 0;
      margin-bottom: 80px;
      position: relative;
      overflow: hidden;
    }
    
    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="%23ffffff" opacity="0.1"><polygon points="1000,100 1000,0 0,100"/></svg>');
      background-size: cover;
    }
    
    .hero-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
      position: relative;
      z-index: 1;
    }
    
    .hero-text {
      color: white;
    }
    
    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 24px;
    }
    
    .hero-subtitle {
      font-size: 1.3rem;
      line-height: 1.6;
      margin-bottom: 40px;
      opacity: 0.9;
    }
    
    .hero-actions {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }
    
    .cta-button {
      background: white !important;
      color: #667eea !important;
      border-radius: 50px !important;
      padding: 16px 32px !important;
      font-weight: 600 !important;
      font-size: 16px !important;
      text-transform: none !important;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15) !important;
      transition: all 0.3s ease !important;
    }
    
    .cta-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.25) !important;
    }
    
    .secondary-button {
      border: 2px solid rgba(255,255,255,0.3) !important;
      color: white !important;
      border-radius: 50px !important;
      padding: 14px 28px !important;
      font-weight: 500 !important;
      text-transform: none !important;
      backdrop-filter: blur(10px);
    }
    
    .hero-visual {
      position: relative;
      height: 400px;
    }
    
    .floating-card {
      position: absolute;
      width: 80px;
      height: 80px;
      background: rgba(255,255,255,0.15);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      animation: float 6s ease-in-out infinite;
      border: 1px solid rgba(255,255,255,0.2);
    }
    
    .card-1 {
      top: 20%;
      left: 20%;
      animation-delay: 0s;
    }
    
    .card-2 {
      top: 50%;
      right: 20%;
      animation-delay: 2s;
    }
    
    .card-3 {
      bottom: 20%;
      left: 40%;
      animation-delay: 4s;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    
    .stats-section {
      padding: 60px 0;
      background: rgba(255,255,255,0.8);
      backdrop-filter: blur(10px);
      margin-bottom: 80px;
    }
    
    .stats-grid {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 40px;
      text-align: center;
    }
    
    .stat-item {
      padding: 20px;
    }
    
    .stat-number {
      font-size: 3rem;
      font-weight: 800;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 8px;
    }
    
    .stat-label {
      font-size: 1.1rem;
      color: #666;
      font-weight: 500;
    }
    
    .ofertas-destacadas {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px 80px;
    }
    
    .section-header {
      text-align: center;
      margin-bottom: 60px;
    }
    
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #333;
      margin-bottom: 16px;
    }
    
    .section-subtitle {
      font-size: 1.2rem;
      color: #666;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .ofertas-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 24px;
      margin-bottom: 60px;
    }
    
    .ver-mas {
      text-align: center;
    }
    
    .view-all-button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      color: white !important;
      border-radius: 50px !important;
      padding: 16px 32px !important;
      font-weight: 600 !important;
      text-transform: none !important;
      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3) !important;
      display: inline-flex !important;
      align-items: center !important;
      gap: 8px !important;
    }
    
    .view-all-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4) !important;
    }
    
    @media (max-width: 768px) {
      .hero-content {
        grid-template-columns: 1fr;
        gap: 40px;
        text-align: center;
        padding: 0 16px;
      }
      
      .hero-title {
        font-size: 2.5rem;
      }
      
      .hero-subtitle {
        font-size: 1.1rem;
      }
      
      .hero-visual {
        height: 200px;
      }
      
      .floating-card {
        width: 60px;
        height: 60px;
        font-size: 24px;
      }
      
      .stats-grid {
        padding: 0 16px;
        gap: 20px;
      }
      
      .stat-number {
        font-size: 2rem;
      }
      
      .section-title {
        font-size: 2rem;
      }
      
      .ofertas-destacadas {
        padding: 0 16px 60px;
      }
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