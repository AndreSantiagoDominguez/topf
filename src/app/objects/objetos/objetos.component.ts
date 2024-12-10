import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IObjeto } from '../../models/i-objeto';
import { IRespuestaIntercambio } from '../../models/irespuesta-intercambio'; 
import { IIntercambio } from '../../models/i-intercambio';
import { ObjetoService } from '../../service/objetos.service';
import { TradeService } from '../../service/trade.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-objetos',
  templateUrl: './objetos.component.html',
  styleUrls: ['./objetos.component.css']
})
export class ObjetosComponent implements OnInit {
  objetos: IObjeto[] = [];
  intercambios: IIntercambio[] = []; // Inicializamos el array de intercambios
  idVideojuego: number | null = null;
  nombre: string = '';
  descripcion: string = '';
  rareza: 'común' | 'raro' | 'épico' | 'legendario' = 'común';
  condicion: 'nuevo' | 'usado' = 'nuevo';
  valor: number = 0;
  id_usuario: number;
  tipoIntercambio: 'objeto' | 'credito' = 'objeto';
  objetoPropuesto: number | null = null;
  creditoOfrecido: number = 0;

  constructor(
    private route: ActivatedRoute,
    private objetoService: ObjetoService,
    private tradeService: TradeService // Añadimos el servicio de intercambio
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
    this.obtenerIntercambiosPorUsuario();
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

  obtenerIntercambiosPorUsuario(): void {
    this.tradeService.obtenerIntercambiosPorUsuario(this.id_usuario).subscribe(
      (response: IRespuestaIntercambio) => {
        if (response.success) {
          this.intercambios = response.data;
          console.log('Intercambios obtenidos:', this.intercambios);
        } else {
          console.error('No se encontraron intercambios');
        }
      },
      (error) => {
        console.error('Error al obtener los intercambios:', error);
      }
    );
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
    const intercambio: IIntercambio = {
      id_objeto_a: objeto.id_objeto,
      id_usuario_ofert: this.id_usuario,
      id_usuario_recept: objeto.id_usuario,
      tipo_intercambio: this.tipoIntercambio,
      estado: 'pendiente',
      id_intercambio: 0,
      id_objeto_b: this.tipoIntercambio === 'objeto' ? this.objetoPropuesto : null,
      credito_ofrecido: this.tipoIntercambio === 'credito' ? this.creditoOfrecido : 0,
      fecha_intercambio: ''
    };

    this.tradeService.crearIntercambio(intercambio).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Intercambio Iniciado',
          text: 'El intercambio ha sido iniciado exitosamente.'
        });
      },
      (error) => {
        console.error('Error al iniciar el intercambio', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al iniciar el intercambio.'
        });
      }
    );
  }

  aceptarIntercambio(intercambio: IIntercambio): void {
    this.tradeService.aceptarIntercambio(this.id_usuario, intercambio.id_intercambio).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Intercambio Aceptado',
          text: 'El intercambio ha sido aceptado exitosamente.'
        });
      },
      (error) => {
        console.error('Error al aceptar el intercambio', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al aceptar el intercambio.'
        });
      }
    );
  }

  rechazarIntercambio(intercambio: IIntercambio): void {
    Swal.fire({
      icon: 'info',
      title: 'Intercambio Rechazado',
      text: 'El intercambio ha sido rechazado.'
    });
  }
}
