 export interface IIntercambio {
    id_intercambio: number;
    id_objeto_a: number;
    id_objeto_b: number | null;
    credito_ofrecido: number;
    id_usuario_ofert: number;
    id_usuario_recept: number | null;
    tipo_intercambio: 'objeto' | 'credito';
    fecha_intercambio: string; // Puede ser un Date si lo prefieres
    estado: 'pendiente' | 'completado' | 'rechazado';
  }
  