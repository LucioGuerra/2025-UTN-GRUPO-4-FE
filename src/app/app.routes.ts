import { Routes } from '@angular/router';
import { OfertasListaComponent } from './components/ofertas-lista/ofertas-lista.component';
import { OfertaDetalleComponent } from './components/oferta-detalle/oferta-detalle.component';

export const routes: Routes = [
  { path: '', redirectTo: '/ofertas', pathMatch: 'full' },
  { path: 'ofertas', component: OfertasListaComponent },
  { path: 'oferta/:id', component: OfertaDetalleComponent }
];
