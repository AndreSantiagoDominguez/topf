import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IObjeto } from '../../models/i-objeto';
import { ObjetoService } from '../../service/objetos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-objetos',
  templateUrl: './objetos.component.html',
  styleUrls: ['./objetos.component.css']
})
export class ObjetosComponent implements OnInit {
  objetos: IObjeto[] = [];
  idVideojuego: number | null = null;
  nombre: string = '';
  descripcion: string = '';
  rareza: 'común' | 'raro' | 'épico' | 'legendario' = 'común';
  condicion: 'nuevo' | 'usado' = 'nuevo';
  valor: number = 0;
  id_usuario: number;

  constructor(
    private route: ActivatedRoute,
    private objetoService: ObjetoService
  ) {
    // Obtener id_usuario desde localStorage usando la clave 'userId'
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.id_usuario = parseInt(userId, 10);
    } else {
      console.error('No se encontró el ID de usuario en localStorage');
      this.id_usuario = 0; // Valor por defecto si no se encuentra el ID de usuario
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id_videojuego');
    if (id) {
      this.idVideojuego = +id;
      this.obtenerObjetosPorVideojuego();
    } else {
      console.error('No se encontró el ID del videojuego en la ruta');
    }
  }

  obtenerObjetosPorVideojuego(): void {
    if (this.idVideojuego !== null) {
      this.objetoService.obtenerObjetosPorVideojuego(this.idVideojuego).subscribe(
        (data) => {
          this.objetos = data;
        },
        (error) => {
          console.error('Error al obtener los objetos', error);
        }
      );
    }
  }

  agregarObjeto(): void {
    if (this.idVideojuego !== null) {
      const nuevoObjeto: IObjeto = {
        id_objeto: 0, // Será asignado por el backend
        nombre: this.nombre,
        descripcion: this.descripcion,
        rareza: this.rareza,
        condicion: this.condicion,
        valor: this.valor,
        id_usuario: this.id_usuario,
        id_videojuego: this.idVideojuego
      };

      this.objetoService.crearObjeto(nuevoObjeto).subscribe(
        (data) => {
          this.objetos.push(data);
          // Limpiar los campos del formulario
          this.nombre = '';
          this.descripcion = '';
          this.rareza = 'común';
          this.condicion = 'nuevo';
          this.valor = 0;
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Objeto agregado exitosamente.'
          });
        },
        (error) => {
          console.error('Error al agregar el objeto', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al agregar el objeto.'
          });
        }
      );
    }
  }

  iniciarIntercambio(objeto: IObjeto): void {
    // Placeholder para manejar el intercambio
    Swal.fire({
      icon: 'info',
      title: 'Intercambiar Objeto',
      text: `¿Deseas intercambiar el objeto "${objeto.nombre}"?`,
      showCancelButton: true,
      confirmButtonText: 'Sí, intercambiar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes implementar la lógica para el intercambio
        Swal.fire({
          icon: 'success',
          title: 'Intercambio Realizado',
          text: `Has intercambiado el objeto "${objeto.nombre}".`
        });
      }
    });
  }
}
