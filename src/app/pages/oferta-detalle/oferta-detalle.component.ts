import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { OfertaListaDTO, EstadoAplicacion } from '../../models/oferta.dto';
import { OfertasService } from '../../services/ofertas.service';
import { UsuarioService, Usuario } from '../../services/usuario.service';
import { AplicarDialogComponent } from '../../components/aplicar-dialog/aplicar-dialog.component';

@Component({
  selector: 'app-oferta-detalle',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatChipsModule, MatIconModule],
  template: `
    @if (oferta) {
    <div class="detalle-page">
      <div class="page-header">
        <div class="header-content">
          <button mat-icon-button class="back-button" (click)="volver()">
            <mat-icon>arrow_back</mat-icon>
          </button>
          <div class="header-info">
            <h1 class="job-title">{{ oferta.titulo }}</h1>
            <div class="job-meta">
              <div class="meta-item">
                <mat-icon>location_on</mat-icon>
                <span>{{ oferta.locacion }}</span>
              </div>
              <div class="meta-item">
                <mat-icon>work</mat-icon>
                <span>{{ oferta.modalidad }}</span>
              </div>
              <div class="salary-highlight">
                {{ oferta.pagoAprox }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="content-container">
        <div class="main-content">
          <mat-card class="modern-card info-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>description</mat-icon>
                Descripción del Puesto
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p class="description-text">{{ oferta.descripcion }}</p>
            </mat-card-content>
          </mat-card>

          <mat-card class="modern-card info-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>checklist</mat-icon>
                Requisitos
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p class="requirements-text">{{ oferta.requisitos }}</p>
            </mat-card-content>
          </mat-card>

          <mat-card class="modern-card tech-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>code</mat-icon>
                Stack Tecnológico
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="tech-grid">
                @for (atributo of oferta.atributos; track atributo) {
                <mat-chip class="tech-chip" selected>{{ atributo }}</mat-chip>
                }
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <div class="sidebar">
          <mat-card class="modern-card action-card">
            <mat-card-content>
              <div class="action-buttons">
                @if (oferta.estado === 'APLICADO') {
                <button mat-raised-button class="applied-button" disabled>
                  <mat-icon>check</mat-icon>
                  Ya Aplicado
                </button>
                } @else {
                <button
                  mat-raised-button
                  class="apply-button"
                  color="primary"
                  (click)="abrirDialogoAplicar()"
                >
                  <mat-icon>send</mat-icon>
                  Aplicar Ahora
                </button>
                }

                <button mat-stroked-button class="save-button">
                  <mat-icon>bookmark_border</mat-icon>
                  Guardar Oferta
                </button>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="modern-card quick-info">
            <mat-card-header>
              <mat-card-title>Información Rápida</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="info-list">
                <div class="info-item">
                  <mat-icon>schedule</mat-icon>
                  <div>
                    <strong>Modalidad</strong>
                    <span>{{ oferta.modalidad }}</span>
                  </div>
                </div>
                <div class="info-item">
                  <mat-icon>payments</mat-icon>
                  <div>
                    <strong>Salario</strong>
                    <span>{{ oferta.pagoAprox }}</span>
                  </div>
                </div>
                <div class="info-item">
                  <mat-icon>location_on</mat-icon>
                  <div>
                    <strong>Ubicación</strong>
                    <span>{{ oferta.locacion }}</span>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
    }
  `,
  styles: [
    `
      .detalle-page {
        min-height: 100vh;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      }

      .page-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 40px 0;
        position: relative;
        overflow: hidden;
      }

      .page-header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="%23ffffff" opacity="0.1"><polygon points="1000,100 1000,0 0,100"/></svg>');
        background-size: cover;
      }

      .header-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 24px;
        display: flex;
        align-items: flex-start;
        gap: 20px;
        position: relative;
        z-index: 1;
      }

      .back-button {
        background: rgba(255, 255, 255, 0.2) !important;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white !important;
        margin-top: 8px;
      }

      .header-info {
        flex: 1;
      }

      .job-title {
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0 0 16px 0;
        line-height: 1.2;
      }

      .job-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 24px;
        align-items: center;
      }

      .meta-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 1rem;
        opacity: 0.9;
      }

      .meta-item mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }

      .salary-highlight {
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        padding: 12px 20px;
        border-radius: 25px;
        font-weight: 600;
        font-size: 1.1rem;
        border: 1px solid rgba(255, 255, 255, 0.3);
      }

      .content-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px 24px;
        display: grid;
        grid-template-columns: 1fr 350px;
        gap: 32px;
      }

      .main-content {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .info-card mat-card-header {
        padding-bottom: 16px;
      }

      .info-card mat-card-title {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 1.3rem;
        font-weight: 600;
        color: #1a202c;
      }

      .info-card mat-card-title mat-icon {
        color: #667eea;
        font-size: 24px;
        width: 24px;
        height: 24px;
      }

      .description-text,
      .requirements-text {
        font-size: 1rem;
        line-height: 1.7;
        color: #4a5568;
        margin: 0;
      }

      .tech-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .tech-chip {
        background: rgba(102, 126, 234, 0.1) !important;
        color: #667eea !important;
        border: 1px solid rgba(102, 126, 234, 0.2) !important;
        font-size: 0.75rem !important;
        font-weight: 500 !important;
        height: 28px !important;
        border-radius: 14px !important;
      }

      .sidebar {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .action-card {
        position: sticky;
        top: 24px;
      }

      .application-status {
        text-align: center;
        margin-bottom: 24px;
        padding: 20px;
        border-radius: 12px;
      }

      .status-applied {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-weight: 600;
      }

      .status-available {
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-weight: 600;
      }

      .action-buttons {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .apply-button {
        background: linear-gradient(
          135deg,
          #667eea 0%,
          #764ba2 100%
        ) !important;
        color: white !important;
        font-weight: 600 !important;
        text-transform: none !important;
        border-radius: 12px !important;
        padding: 16px !important;
        font-size: 1rem !important;
        box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3) !important;
      }

      .apply-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4) !important;
      }

      .applied-button {
        background: #e2e8f0 !important;
        color: #64748b !important;
        font-weight: 500 !important;
        text-transform: none !important;
        border-radius: 12px !important;
        padding: 16px !important;
      }

      .save-button {
        border: 2px solid #e2e8f0 !important;
        color: #64748b !important;
        font-weight: 500 !important;
        text-transform: none !important;
        border-radius: 12px !important;
        padding: 14px !important;
      }

      .save-button:hover {
        background: #f8fafc !important;
        border-color: #cbd5e1 !important;
      }

      .quick-info mat-card-title {
        font-size: 1.1rem;
        color: #1a202c;
      }

      .info-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .info-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
      }

      .info-item mat-icon {
        color: #667eea;
        font-size: 20px;
        width: 20px;
        height: 20px;
        margin-top: 2px;
      }

      .info-item div {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .info-item strong {
        font-size: 0.9rem;
        color: #1a202c;
        font-weight: 600;
      }

      .info-item span {
        font-size: 0.9rem;
        color: #64748b;
      }

      @media (max-width: 1024px) {
        .content-container {
          grid-template-columns: 1fr;
          gap: 24px;
        }

        .action-card {
          position: static;
        }
      }

      @media (max-width: 768px) {
        .header-content {
          padding: 0 16px;
        }

        .job-title {
          font-size: 2rem;
        }

        .job-meta {
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }

        .content-container {
          padding: 24px 16px;
        }

        .main-content {
          gap: 16px;
        }

        .sidebar {
          gap: 16px;
        }
      }
    `,
  ],
})
export class OfertaDetalleComponent implements OnInit {
  oferta?: OfertaListaDTO;
  usuario?: Usuario;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ofertasService: OfertasService,
    private usuarioService: UsuarioService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ofertasService.getOfertaById(id).subscribe((oferta) => {
      this.oferta = oferta;
    });

    this.usuarioService.getCurrentUser().subscribe((usuario) => {
      this.usuario = usuario;
    });
  }

  volver(): void {
    this.router.navigate(['/ofertas']);
  }

  abrirDialogoAplicar(): void {
    if (!this.oferta || !this.usuario) return;

    const dialogRef = this.dialog.open(AplicarDialogComponent, {
      width: '500px',
      data: { ofertaTitulo: this.oferta.titulo },
    });

    dialogRef.afterClosed().subscribe((cartaPresentacion) => {
      if (cartaPresentacion !== undefined && this.oferta && this.usuario) {
        this.ofertasService.aplicarAOferta({
          ofertaId: this.oferta.id,
          usuarioId: this.usuario.id,
          cartaPresentacion,
        });
        this.oferta.estado = EstadoAplicacion.APLICADO;
      }
    });
  }
}
