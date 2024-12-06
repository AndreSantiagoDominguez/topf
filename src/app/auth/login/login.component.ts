import { Component } from '@angular/core';
import { UsuarioService } from '../../service/usuarios.service';
import { IUsuario } from '../../models/i-usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // Inicializamos el objeto user sin id_usuario definido
  user: IUsuario = {
    id_usuario: 0,  // No es necesario iniciar con 0 si no tenemos el valor
    email: '',
    contrasena: '',
  };

  constructor(private usuarioService: UsuarioService) {}

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

        if (response && response.id_usuario) {
          // Asignamos el id_usuario dinámicamente después de recibir la respuesta del backend
          this.user.id_usuario = response.id_usuario;

          // Guarda el ID del usuario en localStorage
          localStorage.setItem('userId', this.user.id_usuario.toString());

          // Muestra el mensaje de éxito con SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            text: `¡Hola, ${response.email || this.user.email}!`,
            timer: 3000,
            timerProgressBar: true
          });

          // Limpia los campos después del inicio de sesión
          this.user.email = ''; 
          this.user.contrasena = ''; 
        } else {
          console.log('ID del usuario no encontrado en la respuesta.');
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se ha encontrado el usuario.'
          });
        }
      },
      error: (error) => {
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
