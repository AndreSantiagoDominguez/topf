import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListObjComponent } from './list-obj/list-obj.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ObjetosComponent } from './objetos/objetos.component';



@NgModule({
  declarations: [
    ListObjComponent,
    ObjetosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
    
  ]
})
export class ObjectsModule { }
