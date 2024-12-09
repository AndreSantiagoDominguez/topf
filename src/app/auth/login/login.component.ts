import { Component } from '@angular/core';
import { UsuarioService } from '../../service/usuarios.service'
import Swal from 'sweetalert2';
import { IUsuario } from '../../models/i-usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: IUsuario = {
    email: '',
    contrasena: '',
  };


  constructor(
    private usuarioService: UsuarioService
  ) { }


  onSubmit() {
    this.loginUsuario();
  }

  loginUsuario() {
    if (!this.user.email || !this.user.contrasena) {
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacíos',
        text: 'Por favor, ingresa un correo y una contraseña.'
      });
      return;
    }
    this.usuarioService.loginUsuario(this.user).subscribe({
      next: (response) => {

        console.log('Respuesta del backend:', response);

        if (response && response.usuario && response.usuario.id_usuario !== undefined) {

          this.user.id_usuario = response.usuario.id_usuario;

          if (this.user.id_usuario !== undefined) {
            localStorage.setItem('userId', this.user.id_usuario.toString());
            Swal.fire({
              icon: 'success',
              title: 'Bienvenido',
              text: `¡Hola, ${response.usuario.nombre || this.user.nombre}!`
              , timer: 3000, timerProgressBar: true
            });
          }  else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se ha encontrado el ID del usuario.'
            });
          }
          
          this.user.email = ''; this.user.contrasena = '';
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se ha encontrado el usuario.'
          });
        }
      }, error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: 'Correo o contraseña incorrectos. Intenta nuevamente.'
        });
        console.error('Error al iniciar sesión:', error);
      }
    });
  }
}