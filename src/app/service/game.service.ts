import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVideojuego } from '../models/i-videojuego';


@Injectable({
  providedIn: 'root'
})

export class GameService {
  private apiUrl = 'http://localhost:3000/videojuegos'; // URL base para las rutas

  constructor(private http: HttpClient) {}

  crearVideojuego(videojuego: IVideojuego): Observable<any> { 
    return this.http.post<any>(`${this.apiUrl}/add`, videojuego);
  }

  obtenerVideojuegos(): Observable<IVideojuego[]> { 
    return this.http.get<IVideojuego[]>(`${this.apiUrl}/ver`); 
  }
}
