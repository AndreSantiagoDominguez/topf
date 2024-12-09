import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { ProfileViewComponent } from './perfil/profile-view/profile-view.component';


const routes: Routes = [
  {path:'registro', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'', component:HomePageComponent},
  {path:'perfil', component:ProfileViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }