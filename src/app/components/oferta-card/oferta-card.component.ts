import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { OfertaListaDTO } from '../../models/oferta.dto';

@Component({
  selector: 'app-oferta-card',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatIconModule, MatButtonModule],
  template: `
    <mat-card class="oferta-card modern-card" (click)="verDetalle()">
      <div class="card-header">
        <div class="title-section">
          <h3 class="job-title">{{ oferta.titulo }}</h3>
          <div class="location">
            <mat-icon class="location-icon">location_on</mat-icon>
            <span>{{ oferta.locacion }}</span>
          </div>
        </div>
        <div class="salary-badge">
          {{ oferta.pagoAprox }}
        </div>
      </div>

      <mat-card-content class="card-content">
        <div class="job-details">
          <div class="detail-item">
            <mat-icon class="detail-icon">work</mat-icon>
            <span>{{ oferta.modalidad }}</span>
          </div>
        </div>

        <div class="tech-stack">
          @for (atributo of atributosLimitados; track atributo) {
            <mat-chip class="tech-chip" selected>{{ atributo }}</mat-chip>
          }
          @if (oferta.atributos.length > 5) {
            <span class="more-tech">+{{ oferta.atributos.length - 5 }} más</span>
          }
        </div>
      </mat-card-content>

      <div class="card-footer">
        <button mat-button class="view-details-btn">
          Ver detalles
          <mat-icon>arrow_forward</mat-icon>
        </button>
      </div>
    </mat-card>
  `,
  styles: [`
    .oferta-card {
      cursor: pointer;
      margin: 16px 0;
      background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
      border: 1px solid rgba(0,0,0,0.05);
      position: relative;
      overflow: hidden;
    }

    .oferta-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .card-header {
      padding: 24px 24px 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
    }

    .title-section {
      flex: 1;
    }

    .job-title {
      font-size: 1.4rem;
      font-weight: 600;
      color: #1a202c;
      margin: 0 0 8px 0;
      line-height: 1.3;
    }

    .location {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #64748b;
      font-size: 0.9rem;
    }

    .location-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .salary-badge {
      background: var(--secondary-gradient);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      white-space: nowrap;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }

    .card-content {
      padding: 0 24px 16px !important;
    }

    .job-details {
      margin-bottom: 16px;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #4a5568;
      font-size: 0.9rem;
      margin-bottom: 8px;
    }

    .detail-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      color: #667eea;
    }

    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;
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

    .more-tech {
      font-size: 0.75rem;
      color: #64748b;
      font-weight: 500;
      padding: 4px 8px;
      background: rgba(100, 116, 139, 0.1);
      border-radius: 12px;
    }

    .card-footer {
      padding: 16px 24px 24px;
      border-top: 1px solid rgba(0,0,0,0.05);
      background: rgba(248, 250, 252, 0.5);
    }

    .view-details-btn {
      color: #667eea !important;
      font-weight: 500 !important;
      text-transform: none !important;
      padding: 8px 16px !important;
      border-radius: 8px !important;
      display: flex !important;
      align-items: center !important;
      gap: 4px !important;
      transition: all 0.3s ease !important;
    }

    .view-details-btn:hover {
      background: rgba(102, 126, 234, 0.1) !important;
    }

    .view-details-btn mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      transition: transform 0.3s ease;
    }

    .oferta-card:hover .view-details-btn mat-icon {
      transform: translateX(4px);
    }

    @media (max-width: 768px) {
      .card-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        padding: 20px 20px 12px;
      }

      .salary-badge {
        align-self: flex-start;
      }

      .job-title {
        font-size: 1.2rem;
      }

      .card-content {
        padding: 0 20px 12px !important;
      }

      .card-footer {
        padding: 12px 20px 20px;
      }
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
