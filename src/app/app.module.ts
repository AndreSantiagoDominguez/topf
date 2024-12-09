import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ObjetosComponent } from './objects/objetos/objetos.component';
import { PerfilModule } from './perfil/perfil.module';
import { GamesModule } from './games/games.module';
import { ObjectsModule } from './objects/objects.module';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,

    
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    RouterLink,
    RouterModule,
    FormsModule,
    HttpClientModule,
    PerfilModule,
    GamesModule,
    ObjectsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
