import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar class="modern-navbar">
      <div class="navbar-content">
        <div class="logo-section" (click)="irInicio()">
          <!-- <div class="logo-icon">🚀</div> -->
          <mat-icon class="school-icon">school</mat-icon>
          <span class="logo-text">UniJobs</span>
        </div>
        <nav class="nav-links">
          <button mat-button class="nav-button" (click)="irInicio()">
            <span>Inicio</span>
          </button>
          <button mat-button class="nav-button" (click)="verOfertas()">
            <span>Ofertas</span>
          </button>
          <button mat-raised-button class="profile-button" color="accent" (click)="irPerfil()">
            <span><mat-icon>person</mat-icon> Mi Perfil</span>
          </button>
        </nav>
      </div>
    </mat-toolbar>
  `,
  styles: [
    `
      .modern-navbar {
        background: var(--glass-white) !important;
        backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--glass-border);
        box-shadow: var(--shadow-dark);
        position: sticky;
        top: 0;
        z-index: 1000;
      }

      .navbar-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 24px;
      }

      .logo-section {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
      }

      .logo-section:hover {
        transform: scale(1.05);
      }

      .logo-icon {
        font-size: 32px;
        filter: drop-shadow(0 4px 8px var(--shadow-dark));
      }

      .school-icon {
        position: absolute;
        right: -13px;
        top: -6px;
        font-size: 20px !important;
        color: var(--primary-dark);
        z-index: 1;
        transform: rotate(25grad);
      }

      .logo-text {
        font-size: 24px;
        font-weight: 700;
        background: var(--primary-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .nav-links {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .nav-button {
        border-radius: 12px !important;
        font-weight: 500 !important;
        text-transform: none !important;
        padding: 8px 16px !important;
        transition: all 0.3s ease !important;
        position: relative;
        overflow: hidden;
      }

      .nav-button:hover {
        background: var(--chip-bg) !important;
        transform: translateY(-2px);
      }

      mat-icon{
        margin-bottom: -7px;
      }

      .profile-button {
        border-radius: 24px !important;
        font-weight: 600 !important;
        padding: 10px 20px !important;
        box-shadow: 0 4px 16px var(--shadow-primary) !important;
        background: var(--secondary-gradient) !important;
      }

      @media (max-width: 768px) {
        .navbar-content {
          padding: 0 16px;
        }

        .logo-text {
          font-size: 20px;
        }

        .nav-links {
          gap: 4px;
        }

        .nav-button span,
        .profile-button span {
          font-size: 14px;
        }
      }
    `,
  ],
})
export class NavbarComponent {
  constructor(private router: Router) { }

  irInicio(): void {
    this.router.navigate(['/']);
  }

  verOfertas(): void {
    this.router.navigate(['/ofertas']);
  }

  irPerfil(): void {
    this.router.navigate(['/perfil']);
  }
}
