import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { OfertasListaComponent } from './pages/ofertas-lista/ofertas-lista.component';
import { OfertaDetalleComponent } from './pages/oferta-detalle/oferta-detalle.component';
import { PerfilAlumnoComponent } from './pages/perfil-alumno/perfil-alumno.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'ofertas', component: OfertasListaComponent },
  { path: 'oferta/:id', component: OfertaDetalleComponent },
  { path: 'perfil', component: PerfilAlumnoComponent }
];
