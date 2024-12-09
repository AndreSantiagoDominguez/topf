import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { EditarCuentaModalComponent } from './editar-cuenta-modal/editar-cuenta-modal.component';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; 
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    ProfileViewComponent,
    EditarCuentaModalComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    ReactiveFormsModule
  ]
})
export class PerfilModule { }
