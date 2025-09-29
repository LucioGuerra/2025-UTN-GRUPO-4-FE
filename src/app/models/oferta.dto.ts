export enum EstadoAplicacion {
  APLICADO = 'APLICADO',
  NO_APLICADO = 'NO_APLICADO'
}

export interface AplicacionDTO {
  ofertaId: number;
  usuarioId: number;
  cartaPresentacion?: string;
}

export interface OfertaListaDTO {
  id: number;
  titulo: string;
  descripcion: string;
  requisitos: string;
  modalidad: string; // "remoto" | "híbrido" | "presencial"
  locacion: string;
  pagoAprox: string; // ejemplo: "USD 1500-2000"
  atributos: string[]; // ejemplo: ["Java", "Spring Boot", "Docker"]
  estado: EstadoAplicacion;
}