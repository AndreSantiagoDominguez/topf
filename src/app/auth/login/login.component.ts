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
  
  user: IUsuario = {
    id_usuario: 0,
    email: '',
    contrasena: '',
  };

  constructor(private usuarioService: UsuarioService) {}

  submitted = false;

  onSubmit() {
    console.log('Formulario enviado:', this.user);
    this.loginUsuario();
  }

  loginUsuario() {
    // Agrega un log para verificar los datos que se envían
    console.log('Datos enviados al backend:', this.user);

    // Verifica que los campos no estén vacíos
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

        if (response && response.id_usuario !== undefined) {
          localStorage.setItem('userId', response.id_usuario.toString());
          Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            text: `¡Hola, ${response.nombre}!`,
            timer: 3000,
            timerProgressBar: true
          });

          this.submitted = true;
          this.user.email = ''; // Limpia el campo de email
          this.user.contrasena = ''; // Limpia el campo de contraseña
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo recuperar el ID del usuario.'
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

  // Método para recuperar el id_usuario desde el localStorage
  getUserIdFromLocalStorage(): number | null {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const id = Number(userId); // Convierte el valor a número
      if (!isNaN(id)) {
        return id;
      } else {
        console.error('El ID recuperado no es un número válido.');
        return null;
      }
    } else {
      console.log('No se encontró userId en el localStorage.');
      return null;
    }
  }
}
