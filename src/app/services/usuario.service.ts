import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { API_URL } from '../app.config';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) {}

  getCurrentUser(): Observable<Usuario> {
    // TODO: Reemplazar con: return this.http.get<Usuario>(`${this.apiUrl}/me`);
    return of({
      id: 1,
      nombre: 'Juan Pérez',
      email: 'juan.perez@email.com'
    });
  }
}