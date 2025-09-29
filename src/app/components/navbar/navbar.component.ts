import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span class="logo" (click)="irInicio()">UniJobs</span>
      <span class="spacer"></span>
      <button mat-button (click)="irInicio()">Inicio</button>
      <button mat-button (click)="verOfertas()">Ofertas</button>
      <button mat-button>Mi Perfil</button>
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    .logo {
      cursor: pointer;
      font-weight: bold;
    }
  `]
})
export class NavbarComponent {
  constructor(private router: Router) {}

  irInicio(): void {
    this.router.navigate(['/']);
  }

  verOfertas(): void {
    this.router.navigate(['/ofertas']);
  }
}