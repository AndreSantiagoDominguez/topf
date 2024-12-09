import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Si tienes configurado un archivo environment
import { IObjeto } from '../models/i-objeto';

@Injectable({
  providedIn: 'root'
})
export class ObjetoService {

  private apiUrl = 'http://localhost:3000/objetos'; // URL base para las rutas

  constructor(private http: HttpClient) {}

  // Crear nuevo objeto
  crearObjeto(objeto: IObjeto): Observable<IObjeto> {
    return this.http.post<IObjeto>(`${this.apiUrl}/`, objeto);
  }

  // Obtener objeto por ID
  obtenerObjeto(id: number): Observable<IObjeto> {
    return this.http.get<IObjeto>(`${this.apiUrl}/${id}`);
  }

  // Actualizar objeto
  actualizarObjeto(id: number, objeto: IObjeto): Observable<IObjeto> {
    return this.http.put<IObjeto>(`${this.apiUrl}/${id}`, objeto);
  }

  // Eliminar objeto
  eliminarObjeto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obtener objetos por ID de videojuego
  obtenerObjetosPorVideojuego(id_videojuego: number): Observable<IObjeto[]> {
    return this.http.get<IObjeto[]>(`${this.apiUrl}/videojuego/${id_videojuego}`);
  }

  // Obtener objetos por ID de usuario
  obtenerObjetosPorUsuario(id_usuario: number): Observable<IObjeto[]> {
    return this.http.get<IObjeto[]>(`${this.apiUrl}/usuario/${id_usuario}`);
  }
}
