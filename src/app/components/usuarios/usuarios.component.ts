import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from 'src/app/core/services/Usuarios/usuario-service.service';

import { Usuario } from 'src/app/core/models/Usuarios/usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {
  /* Usuários */
  
  usuarios: Usuario[] = [];

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.usuarioService.getAll().subscribe(
      x => this.usuarios = x,
      error => { console.log("Erro: " + error) },
      () => {

      }
    );
  }

  /* Ações */

  alterar(id: number) {
    this.router.navigate(["/usuarios-cadastro/" + id]);
  }

  excluir(id: number) {
    let retorno: boolean = false;

    this.usuarioService.delete(id).subscribe(
      x => retorno = x,
      error => { console.log("Erro: " + error) },
      () => {
        if (retorno) {
          this.carregarUsuarios();
        }
      }
    );    
  }
}
