import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideojuegosComponent } from './videojuegos/videojuegos.component';
import { RouterModule } from '@angular/router';
import { ObjetosComponent } from '../objects/objetos/objetos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AgregarVideojuegoModalComponent } from './agregar-videojuego-modal/agregar-videojuego-modal.component';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; 
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes = [
  { path: 'videojuegos', component: VideojuegosComponent },
  { path: 'objetos/videojuego/:id_videojuego', component: ObjetosComponent },
];

@NgModule({
  declarations: [
    VideojuegosComponent,
    AgregarVideojuegoModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, // Importa este módulo aquí,
    RouterModule.forChild(routes),
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    ReactiveFormsModule
  ]})
export class GamesModule { }
