export interface OfertaListaDTO {
  id: number;
  titulo: string;
  descripcion: string;
  requisitos: string;
  modalidad: string; // "remoto" | "híbrido" | "presencial"
  locacion: string;
  pagoAprox: string; // ejemplo: "USD 1500-2000"
  atributos: string[]; // ejemplo: ["Java", "Spring Boot", "Docker"]
}