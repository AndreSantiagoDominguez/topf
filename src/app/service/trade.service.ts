import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IIntercambio } from '../models/i-intercambio';


@Injectable({
  providedIn: 'root'
})

export class TradeService {

  private apiUrl = 'http://localhost:3000/intercambios'; // URL base para las rutas

  constructor(private http: HttpClient) { }



  crearIntercambio(intercambio: IIntercambio): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/intercambios`, intercambio);
  }


  aceptarIntercambio(id_usuario: number, id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/intercambios/${id_usuario}/intercambio/${id}`, {});
  }

  obtenerIntercambiosPorUsuario(id_usuario: number): Observable<IIntercambio[]> {
    return this.http.get<IIntercambio[]>(`${this.apiUrl}/intercambios/usuario/${id_usuario}`);
  }
}
