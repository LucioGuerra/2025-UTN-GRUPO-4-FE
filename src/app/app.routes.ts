import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { OfertasListaComponent } from './components/ofertas-lista/ofertas-lista.component';
import { OfertaDetalleComponent } from './components/oferta-detalle/oferta-detalle.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'ofertas', component: OfertasListaComponent },
  { path: 'oferta/:id', component: OfertaDetalleComponent }
];
