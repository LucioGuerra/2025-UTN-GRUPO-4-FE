import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { OfertaListaDTO, EstadoAplicacion, AplicacionDTO } from '../models/oferta.dto';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {
  private ofertas: OfertaListaDTO[] = [];

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) {
    this.ofertas = this.getMockOfertas();
  }

  getOfertas(): Observable<OfertaListaDTO[]> {
    // TODO: Reemplazar con: return this.http.get<OfertaListaDTO[]>(`${this.apiUrl}/ofertas`);
    return of([...this.ofertas]);
  }

  getOfertaById(id: number): Observable<OfertaListaDTO | undefined> {
    // TODO: Reemplazar con: return this.http.get<OfertaListaDTO>(`${this.apiUrl}/ofertas/${id}`);
    return of(this.ofertas.find(o => o.id === id));
  }

  aplicarAOferta(aplicacion: AplicacionDTO): void {
    const oferta = this.ofertas.find(o => o.id === aplicacion.ofertaId);
    if (oferta) {
      oferta.estado = EstadoAplicacion.APLICADO;
      this.guardarAplicacion(aplicacion);
    }
  }

  private guardarAplicacion(aplicacion: AplicacionDTO): void {
    const appDto = {
      ofertaId: aplicacion.ofertaId,
      usuarioId: aplicacion.usuarioId,
      cartaPresentacion: aplicacion.cartaPresentacion || null
    };
    const contenido = JSON.stringify(appDto, null, 2);
    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aplicacion_${aplicacion.ofertaId}_${aplicacion.usuarioId}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private getMockOfertas(): OfertaListaDTO[] {
    return [
      {
        id: 1,
        titulo: 'Desarrollador Full Stack',
        descripcion: 'Buscamos un desarrollador full stack con experiencia en tecnologías modernas para unirse a nuestro equipo dinámico.',
        requisitos: 'Mínimo 3 años de experiencia en Angular y Node.js, conocimientos en bases de datos NoSQL.',
        modalidad: 'remoto',
        locacion: 'Buenos Aires, Argentina',
        pagoAprox: 'USD 2000-3000',
        atributos: ['Angular', 'Node.js', 'TypeScript', 'MongoDB', 'Docker', 'AWS'],
        estado: EstadoAplicacion.NO_APLICADO,
        empresa: { id: 1, nombre: 'TechCorp Solutions' }
      },
      {
        id: 2,
        titulo: 'Frontend Developer',
        descripcion: 'Desarrollador frontend especializado en React para proyectos innovadores.',
        requisitos: '2+ años de experiencia en React, conocimientos en testing y metodologías ágiles.',
        modalidad: 'híbrido',
        locacion: 'Córdoba, Argentina',
        pagoAprox: 'USD 1500-2500',
        atributos: ['React', 'JavaScript', 'CSS', 'HTML'],
        estado: EstadoAplicacion.NO_APLICADO,
        empresa: { id: 2, nombre: 'InnovateWeb' }
      },
      {
        id: 3,
        titulo: 'Backend Developer Java',
        descripcion: 'Desarrollador backend con experiencia en Spring Boot y microservicios.',
        requisitos: '4+ años de experiencia en Java, Spring Boot, conocimientos en Docker y Kubernetes.',
        modalidad: 'presencial',
        locacion: 'Mendoza, Argentina',
        pagoAprox: 'USD 2500-3500',
        atributos: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Kubernetes'],
        estado: EstadoAplicacion.NO_APLICADO,
        empresa: { id: 3, nombre: 'Enterprise Systems' }
      }
    ];
  }
}