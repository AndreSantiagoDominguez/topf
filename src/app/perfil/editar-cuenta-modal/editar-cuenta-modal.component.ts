import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-cuenta-modal',
  templateUrl: './editar-cuenta-modal.component.html',
  styleUrls: ['./editar-cuenta-modal.component.css']
})
export class EditarCuentaModalComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditarCuentaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      nombre: [data.nombre, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      pais: [data.pais, Validators.required],
      contrasena: [data.contrasena, [Validators.required]]
    });
  }

  guardar() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cerrar() {
    this.dialogRef.close();
  }
}
