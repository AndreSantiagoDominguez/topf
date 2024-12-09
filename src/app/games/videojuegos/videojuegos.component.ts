import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarVideojuegoModalComponent } from '../agregar-videojuego-modal/agregar-videojuego-modal.component';
import { IVideojuego } from '../../models/i-videojuego';
import { GameService } from '../../service/game.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-videojuegos',
  templateUrl: './videojuegos.component.html',
  styleUrls: ['./videojuegos.component.css']
})
export class VideojuegosComponent implements OnInit {
  videojuegos: IVideojuego[] = [];
  imagenesPorGenero: { [key: string]: string } = {
    'Acción': 'assets/FPS.jpg',
    'Aventura': 'url_de_imagen_aventura',
    'RPG': 'url_de_imagen_rpg',
    'Estrategia': 'url_de_imagen_estrategia',
    'Deportes': 'url_de_imagen_deportes',
    'Simulación': 'url_de_imagen_simulacion',
    'Puzzle': 'url_de_imagen_puzzle',
    'Terror': 'url_de_imagen_terror'
  };

  constructor(
    private dialog: MatDialog,
    private videojuegoService: GameService
  ) {}

  ngOnInit(): void {
    this.obtenerVideojuegos();
  }

  obtenerVideojuegos(): void {
    this.videojuegoService.obtenerVideojuegos().subscribe(
      (data) => {
        this.videojuegos = data;
      },
      (error) => {
        console.error('Error al obtener los videojuegos', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al obtener los videojuegos.',
        });
      }
    );
  }

  obtenerImagenPorGenero(genero: string): string {
    return this.imagenesPorGenero[genero] || 'url_de_imagen_predeterminada';
  }

  abrirAgregarVideojuegoModal(): void {
    const dialogRef = this.dialog.open(AgregarVideojuegoModalComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.videojuegoService.crearVideojuego(result).subscribe(
          (data) => {
            this.videojuegos.push(data);
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Videojuego agregado exitosamente.',
            });
          },
          (error) => {
            console.error('Error al agregar el videojuego', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error al agregar el videojuego.',
            });
          }
        );
      }
    });
  }
}
