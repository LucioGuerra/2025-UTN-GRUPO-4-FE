import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

export interface DialogData {
  ofertaTitulo: string;
}

@Component({
  selector: 'app-aplicar-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  template: `
    <h2 mat-dialog-title>Aplicar a: {{ data.ofertaTitulo }}</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" style="width: 100%;">
        <mat-label>Carta de Presentación (opcional)</mat-label>
        <textarea 
          matInput 
          [(ngModel)]="cartaPresentacion" 
          rows="6"
          placeholder="Escribe tu carta de presentación aquí...">
        </textarea>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cancelar()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="aplicar()">Aplicar</button>
    </mat-dialog-actions>
  `
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