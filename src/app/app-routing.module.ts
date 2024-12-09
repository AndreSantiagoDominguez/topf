import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { ProfileViewComponent } from './perfil/profile-view/profile-view.component';
import { ObjetosComponent } from './objects/objetos/objetos.component';
import { VideojuegosComponent } from './games/videojuegos/videojuegos.component';

const routes: Routes = [
  { path: 'registro', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: ProfileViewComponent },
  { path: 'videojuegos', component: VideojuegosComponent }, // Ruta para videojuegos
  { path: 'objetos/videojuego/:id_videojuego', component: ObjetosComponent }, // Ruta para objetos
  { path:'',  component: HomePageComponent}, 
  { path: 'games', redirectTo: '/videojuegos', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/videojuegos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
