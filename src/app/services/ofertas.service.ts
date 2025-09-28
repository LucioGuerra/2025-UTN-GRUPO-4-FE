import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { OfertaListaDTO } from '../models/oferta.dto';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {
  private readonly API_URL = 'http://localhost:8080/api'; // Cambiar por URL del backend

  constructor(private http: HttpClient) {}

  getOfertas(): Observable<OfertaListaDTO[]> {
    // TODO: Reemplazar con: return this.http.get<OfertaListaDTO[]>(`${this.API_URL}/ofertas`);
    return of(this.getMockOfertas());
  }

  getOfertaById(id: number): Observable<OfertaListaDTO | undefined> {
    // TODO: Reemplazar con: return this.http.get<OfertaListaDTO>(`${this.API_URL}/ofertas/${id}`);
    return of(this.getMockOfertas().find(o => o.id === id));
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
        atributos: ['Angular', 'Node.js', 'TypeScript', 'MongoDB', 'Docker', 'AWS']
      },
      {
        id: 2,
        titulo: 'Frontend Developer',
        descripcion: 'Desarrollador frontend especializado en React para proyectos innovadores.',
        requisitos: '2+ años de experiencia en React, conocimientos en testing y metodologías ágiles.',
        modalidad: 'híbrido',
        locacion: 'Córdoba, Argentina',
        pagoAprox: 'USD 1500-2500',
        atributos: ['React', 'JavaScript', 'CSS', 'HTML']
      },
      {
        id: 3,
        titulo: 'Backend Developer Java',
        descripcion: 'Desarrollador backend con experiencia en Spring Boot y microservicios.',
        requisitos: '4+ años de experiencia en Java, Spring Boot, conocimientos en Docker y Kubernetes.',
        modalidad: 'presencial',
        locacion: 'Mendoza, Argentina',
        pagoAprox: 'USD 2500-3500',
        atributos: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Kubernetes']
      }
    ];
  }
}