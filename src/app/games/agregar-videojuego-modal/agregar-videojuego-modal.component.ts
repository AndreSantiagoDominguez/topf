import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IVideojuego } from '../../models/i-videojuego';

@Component({
  selector: 'app-agregar-videojuego-modal',
  templateUrl: './agregar-videojuego-modal.component.html',
  styleUrls: ['./agregar-videojuego-modal.component.css']
})
export class AgregarVideojuegoModalComponent {
  videojuegoForm: FormGroup;
  plataformas = ['PC', 'PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox Series X', 'Nintendo Switch', 'Mobile', 'VR'];
  generos = ['Acción', 'Aventura', 'RPG', 'Estrategia', 'Deportes', 'Simulación', 'Puzzle', 'Terror'];
  desarrolladoras = ['Ubisoft', 'EA', 'Activision', 'Nintendo', 'Sony', 'Microsoft', 'Bethesda', 'Square Enix'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AgregarVideojuegoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.videojuegoForm = this.fb.group({
      nombre: ['', Validators.required],
      genero: ['', Validators.required],
      plataforma: ['', Validators.required],
      anio_lanzamiento: ['', [Validators.required, Validators.min(1950), Validators.max(new Date().getFullYear())]],
      desarrolladora: ['', Validators.required]
    });
  }

  guardar(): void {
    if (this.videojuegoForm.valid) {
      this.dialogRef.close(this.videojuegoForm.value);
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
