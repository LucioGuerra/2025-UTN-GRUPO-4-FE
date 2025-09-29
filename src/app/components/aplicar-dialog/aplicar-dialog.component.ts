import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

export interface DialogData {
  ofertaTitulo: string;
}

@Component({
  selector: 'app-aplicar-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, FormsModule],
  template: `
    <div class="dialog-container">
      <div class="dialog-header">
        <div class="header-icon">
          <mat-icon>send</mat-icon>
        </div>
        <div class="header-text">
          <h2 class="dialog-title">Aplicar a Oferta</h2>
          <p class="job-title">{{ data.ofertaTitulo }}</p>
        </div>
      </div>
      
      <mat-dialog-content class="dialog-content">
        <div class="form-section">
          <div class="section-header">
            <mat-icon>edit_note</mat-icon>
            <span>Carta de Presentación</span>
            <span class="optional-badge">Opcional</span>
          </div>
          
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Personaliza tu aplicación</mat-label>
            <textarea 
              matInput 
              [(ngModel)]="cartaPresentacion" 
              rows="8"
              placeholder="Comparte por qué eres el candidato ideal para esta posición. Menciona tu experiencia relevante, habilidades y motivación...">
            </textarea>
            <mat-hint>{{ cartaPresentacion.length }}/1000 caracteres</mat-hint>
          </mat-form-field>
          
          <div class="tips-section">
            <h4>Consejos para tu carta:</h4>
            <ul>
              <li>Menciona tu experiencia relevante</li>
              <li>Destaca habilidades que coincidan con los requisitos</li>
              <li>Explica tu motivación para el puesto</li>
              <li>Mantén un tono profesional pero personal</li>
            </ul>
          </div>
        </div>
      </mat-dialog-content>
      
      <mat-dialog-actions class="dialog-actions">
        <button mat-stroked-button class="cancel-button" (click)="cancelar()">
          <mat-icon>close</mat-icon>
          Cancelar
        </button>
        <button mat-raised-button class="apply-button" color="primary" (click)="aplicar()">
          <mat-icon>send</mat-icon>
          Enviar Aplicación
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .dialog-container {
      max-width: 600px;
      width: 100%;
    }
    
    .dialog-header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 24px 24px 0;
      margin-bottom: 24px;
    }
    
    .header-icon {
      width: 48px;
      height: 48px;
      background: var(--primary-gradient);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--white);
    }
    
    .header-icon mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }
    
    .header-text {
      flex: 1;
    }
    
    .dialog-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 4px 0;
    }
    
    .job-title {
      font-size: 1rem;
      color: var(--primary-color);
      font-weight: 500;
      margin: 0;
    }
    
    .dialog-content {
      padding: 0 24px !important;
      max-height: 70vh;
      overflow-y: auto;
    }
    
    .form-section {
      margin-bottom: 24px;
    }
    
    .section-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
      font-weight: 500;
      color: var(--text-light);
    }
    
    .section-header mat-icon {
      color: var(--primary-color);
      font-size: 20px;
      width: 20px;
      height: 20px;
    }
    
    .optional-badge {
      background: var(--border-light);
      color: var(--text-muted);
      font-size: 0.75rem;
      padding: 4px 8px;
      border-radius: 12px;
      font-weight: 500;
      margin-left: auto;
    }
    
    .full-width {
      width: 100%;
    }
    
    .full-width textarea {
      min-height: 120px;
      resize: vertical;
    }
    
    .tips-section {
      background: var(--background-light);
      border: 1px solid var(--border-light);
      border-radius: 12px;
      padding: 20px;
      margin-top: 16px;
    }
    
    .tips-section h4 {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-light);
      margin: 0 0 12px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .tips-section h4::before {
      content: '💡';
      font-size: 16px;
    }
    
    .tips-section ul {
      margin: 0;
      padding-left: 20px;
      color: var(--text-muted);
    }
    
    .tips-section li {
      margin-bottom: 6px;
      font-size: 0.9rem;
    }
    
    .dialog-actions {
      padding: 24px !important;
      gap: 12px !important;
      justify-content: flex-end !important;
      border-top: 1px solid var(--border-light);
      margin-top: 24px;
    }
    
    .cancel-button {
      border: 2px solid var(--border-light) !important;
      color: var(--text-muted) !important;
      font-weight: 500 !important;
      text-transform: none !important;
      border-radius: 8px !important;
      padding: 10px 20px !important;
    }
    
    .cancel-button:hover {
      background: var(--background-light) !important;
      border-color: var(--border-medium) !important;
    }
    
    .apply-button {
      background: var(--primary-gradient) !important;
      color: var(--white) !important;
      font-weight: 600 !important;
      text-transform: none !important;
      border-radius: 8px !important;
      padding: 12px 24px !important;
      box-shadow: 0 4px 12px var(--shadow-primary) !important;
    }
    
    .apply-button:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px var(--shadow-primary-hover) !important;
    }
    
    .cancel-button mat-icon,
    .apply-button mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      margin-right: 4px;
    }
    
    @media (max-width: 600px) {
      .dialog-container {
        max-width: 100vw;
        margin: 0;
      }
      
      .dialog-header {
        padding: 16px 16px 0;
      }
      
      .dialog-content {
        padding: 0 16px !important;
      }
      
      .dialog-actions {
        padding: 16px !important;
        flex-direction: column-reverse;
      }
      
      .cancel-button,
      .apply-button {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class AplicarDialogComponent {
  cartaPresentacion = '';

  constructor(
    public dialogRef: MatDialogRef<AplicarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  cancelar(): void {
    this.dialogRef.close();
  }

  aplicar(): void {
    this.dialogRef.close(this.cartaPresentacion);
  }
}