import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EmpresaDTO } from '../models/empresa.dto';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  constructor() { }

  getEmpresas(): Observable<EmpresaDTO[]> {
    return of(this.getMockEmpresas());
  }

  private getMockEmpresas(): EmpresaDTO[] {
    return [
      {
        id: 1,
        nombre: 'TechCorp',
        logo: '🚀',
        descripcion: 'Líder en soluciones tecnológicas innovadoras',
        sector: 'Tecnología',
        tamanio: 'Grande',
        sitioWeb: 'https://techcorp.com'
      },
      {
        id: 2,
        nombre: 'InnovateLab',
        logo: '💡',
        descripcion: 'Startup enfocada en IA y Machine Learning',
        sector: 'Inteligencia Artificial',
        tamanio: 'Startup',
        sitioWeb: 'https://innovatelab.com'
      },
      {
        id: 3,
        nombre: 'DataSolutions',
        logo: '📊',
        descripcion: 'Especialistas en análisis de datos y Big Data',
        sector: 'Data Science',
        tamanio: 'Mediana',
        sitioWeb: 'https://datasolutions.com'
      },
      {
        id: 4,
        nombre: 'CloudFirst',
        logo: '☁️',
        descripcion: 'Servicios de cloud computing y DevOps',
        sector: 'Cloud Computing',
        tamanio: 'Mediana',
        sitioWeb: 'https://cloudfirst.com'
      },
      {
        id: 5,
        nombre: 'MobileTech',
        logo: '📱',
        descripcion: 'Desarrollo de aplicaciones móviles nativas',
        sector: 'Desarrollo Móvil',
        tamanio: 'Pequeña',
        sitioWeb: 'https://mobiletech.com'
      },
      {
        id: 6,
        nombre: 'CyberSecure',
        logo: '🔒',
        descripcion: 'Soluciones de ciberseguridad empresarial',
        sector: 'Ciberseguridad',
        tamanio: 'Grande',
        sitioWeb: 'https://cybersecure.com'
      }
    ];
  }
}
