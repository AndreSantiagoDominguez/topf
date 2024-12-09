export interface IObjeto {
    id_objeto: number;
    nombre: string;
    descripcion?: string;
    rareza: 'común' | 'raro' | 'épico' | 'legendario';
    condicion: 'nuevo' | 'usado';
    valor: number;
    id_usuario: number;
    id_videojuego: number;
  }
  