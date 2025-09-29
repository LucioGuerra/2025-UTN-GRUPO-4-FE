import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { OfertaListaDTO, EstadoAplicacion } from '../../models/oferta.dto';
import { OfertasService } from '../../services/ofertas.service';
import { UsuarioService, Usuario } from '../../services/usuario.service';
import { AplicarDialogComponent } from '../aplicar-dialog/aplicar-dialog.component';

@Component({
  selector: 'app-oferta-detalle',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatChipsModule],
  template: `
    @if (oferta) {
      <div class="detalle-container">
        <mat-card>
          <mat-card-header>
            <mat-card-title>{{ oferta.titulo }}</mat-card-title>
            <mat-card-subtitle>{{ oferta.locacion }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p><strong>Modalidad:</strong> {{ oferta.modalidad }}</p>
            <p><strong>Pago aproximado:</strong> {{ oferta.pagoAprox }}</p>
            <p><strong>Descripción:</strong></p>
            <p>{{ oferta.descripcion }}</p>
            <p><strong>Requisitos:</strong></p>
            <p>{{ oferta.requisitos }}</p>
            <div class="atributos">
              <strong>Tecnologías:</strong>
              @for (atributo of oferta.atributos; track atributo) {
                <mat-chip>{{ atributo }}</mat-chip>
              }
            </div>
          </mat-card-content>
          <mat-card-actions>
            @if (oferta.estado === 'APLICADO') {
              <button mat-raised-button color="accent" disabled>Ya Aplicado</button>
            } @else {
              <button mat-raised-button color="primary" (click)="abrirDialogoAplicar()">Aplicar</button>
            }
            <button mat-button (click)="volver()">Volver</button>
          </mat-card-actions>
        </mat-card>
      </div>
    }
  `,
  styles: [`
    .detalle-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .atributos {
      margin-top: 16px;
    }
    mat-chip {
      margin: 2px;
    }
  `]
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
    this.ofertasService.getOfertaById(id).subscribe(oferta => {
      this.oferta = oferta;
    });
    
    this.usuarioService.getCurrentUser().subscribe(usuario => {
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
      data: { ofertaTitulo: this.oferta.titulo }
    });

    dialogRef.afterClosed().subscribe(cartaPresentacion => {
      if (cartaPresentacion !== undefined && this.oferta && this.usuario) {
        this.ofertasService.aplicarAOferta({
          ofertaId: this.oferta.id,
          usuarioId: this.usuario.id,
          cartaPresentacion
        });
        this.oferta.estado = EstadoAplicacion.APLICADO;
      }
    });
  }
}