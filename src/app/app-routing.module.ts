import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuariosCadastroComponent } from './components/usuarios-cadastro/usuarios-cadastro.component';

const routes: Routes = [
  { path: "", component: UsuariosComponent },
  { path: "usuarios", component: UsuariosComponent },
  { path: "usuarios-cadastro", component: UsuariosCadastroComponent },
  { path: "usuarios-cadastro/:id", component: UsuariosCadastroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
