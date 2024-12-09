import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuarios.service';
import { IUsuario } from '../../models/i-usuario';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog'; import { EditarCuentaModalComponent } from '../editar-cuenta-modal/editar-cuenta-modal.component'; // otros imports...

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  user: IUsuario = {
    nombre: '',
    email: '',
    pais: '',
  };

  constructor(
    private usuarioService: UsuarioService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.obtenerUsuario();
  }

  obtenerUsuario() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.usuarioService.obtenerUsuario(+userId).subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (error) => {
          console.error('Error al obtener el usuario', error);
        }
      });
    } else {
      console.error('No se encontró el ID de usuario en el localStorage');
    }
  }


  abrirEditarCuentaModal() {
    const dialogRef = this.dialog.open(EditarCuentaModalComponent,
      { width: '400px', data: { ...this.user } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.actualizarUsuario(result);
      }
    });
  }



  actualizarUsuario(data: any) {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.usuarioService.actualizarUsuario(+userId, data).subscribe({
        next: (updatedUser) => {
          this.user = updatedUser;
          Swal.fire('Éxito', 'La cuenta ha sido actualizada correctamente', 'success');
        }, error: (error) => {
          console.error('Error al actualizar el usuario', error);
          Swal.fire(
            'Error',
            'No se pudo actualizar la cuenta',
            'error');
        }
      });
    }
  }

  eliminarUsuario() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.usuarioService.eliminarUsuario(+userId).subscribe({
        next: () => {
          Swal.fire('Cuenta eliminada', 'Tu cuenta ha sido eliminada correctamente', 'success');
          localStorage.removeItem('userId');
          // Redirigir al usuario a la página de inicio de sesión o página principal
        },
        error: (error) => {
          console.error('Error al eliminar el usuario', error);
          Swal.fire('Error', 'No se pudo eliminar la cuenta', 'error');
        }
      });
    }
  }

  cerrarSesion() {
    localStorage.removeItem('userId');
    Swal.fire(
      'Sesión cerrada', 'Has cerrado sesión correctamente', 'success'
    ); // Redirigir al usuario a la página de inicio de sesión o página principal 
  }
}
