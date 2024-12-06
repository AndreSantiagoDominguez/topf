import { Component } from '@angular/core';
import { IUsuario } from '../../models/i-usuario'; 
import { UsuarioService } from '../../service/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user: IUsuario = {
    nombre: '',
    email: '',
    contrasena: '',
    pais: '',
    creditos: 100
  };

  confirmContrasena = '';
  submitted = false;

  constructor(private usuarioService: UsuarioService) {}

  onSubmit() {
    this.usuarioService.registerUsuario(this.user).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: `¡Bienvenido, ${response.nombre}!`,
          timer: 3000,
          timerProgressBar: true
        });
        this.submitted = true;
        
        this.user = {
          nombre: '',
          email: '',
          contrasena: '',
          pais: '',
          creditos: 0
        };
        
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: 'Ocurrió un problema al registrar tu cuenta. Intenta nuevamente más tarde.'
        });
        console.error('Error al registrar usuario:', error);
      }
    });
  }
}