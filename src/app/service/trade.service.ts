import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IIntercambio } from '../models/i-intercambio';
import { IRespuestaIntercambio } from '../models/irespuesta-intercambio';

@Injectable({
  providedIn: 'root'
})
export class TradeService {
  private apiUrl = 'http://localhost:3000/intercambios'; // URL base para las rutas

  constructor(private http: HttpClient) { }

  crearIntercambio(intercambio: IIntercambio): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, intercambio); // Actualiza la ruta según la configuración del backend
  }

  aceptarIntercambio(id_usuario: number, id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id_usuario}/intercambio/${id}`, {});
  }

  obtenerIntercambiosPorUsuario(id_usuario: number): Observable<IRespuestaIntercambio> { return this.http.get<IRespuestaIntercambio>(`${this.apiUrl}/usuario/${id_usuario}`); }
}
