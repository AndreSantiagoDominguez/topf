import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsuario } from '../models/i-usuario';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios'; // URL base para las rutas

  constructor(private http: HttpClient) {}

  registerUsuario(usuario: IUsuario): Observable<IUsuario> {
    return this.http.post<IUsuario>(`${this.apiUrl}/register`, usuario);
  }
  
  loginUsuario(usuario: IUsuario): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, usuario).pipe(
        catchError((error) => {
            console.error('Error en la solicitud de login', error);
            return throwError(error);
        })
    );
}

  // Obtener un usuario por ID
  obtenerUsuario(id: number): Observable<IUsuario> {
    return this.http.get<IUsuario>(`${this.apiUrl}/${id}`);
  }

  // Actualizar un usuario
  actualizarUsuario(id: number, usuario: IUsuario): Observable<IUsuario> {
    return this.http.put<IUsuario>(`${this.apiUrl}/${id}`, usuario);
  }

  // Eliminar un usuario
  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
