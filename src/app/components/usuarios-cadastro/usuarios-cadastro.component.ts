import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { EscolaridadeService } from 'src/app/core/services/Escolaridades/escolaridade.service';
import { UsuarioService } from 'src/app/core/services/Usuarios/usuario-service.service';

import { Escolaridade } from 'src/app/core/models/Escolaridades/escolaridade';
import { Usuario } from 'src/app/core/models/Usuarios/usuario';

@Component({
  selector: 'app-usuarios-cadastro',
  templateUrl: './usuarios-cadastro.component.html',
  styleUrls: ['./usuarios-cadastro.component.css']
})

export class UsuariosCadastroComponent implements OnInit {
  /* Formulário */

  formEnviado: boolean = false;
  formDados: FormGroup;

  /* Escolaridade */

  escolaridades: Escolaridade[] = [];

  /* Usuário */

  usuarioAtual: Usuario = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private escolaridadeService: EscolaridadeService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.formDados = this.formBuilder.group({
      nome: ["", Validators.required],
      sobrenome: ["", Validators.required],
      email: ["", Validators.required],
      dataNascimento: ["", Validators.required],
      escolaridade: ["", Validators.required]
    });

    this.escolaridadeService.getAll().subscribe(
      x => this.escolaridades = x,
      error => { console.log("Erro: " + error) },
      () => {
        if (this.escolaridades.length > 0) {
          this.formDados.controls["escolaridade"].setValue(this.escolaridades[0].id);
        }

        let id: string = null;

        this.route.params.subscribe(params => { id = params.id; });
    
        if (id != null) {
          this.carregarUsuario(id);
        }
      }
    );
  }

  get f() {
    return this.formDados.controls;
  }

  /* Dados */

  carregarUsuario(id: string) {
    let idUsuario: number = Number(id);

    this.usuarioService.getById(idUsuario).subscribe(
      x => this.usuarioAtual = x,
      error => { console.log("Erro: " + error) },
      () => {
        this.repassarDados();
      }
    );
  }

  repassarDados() {
    if (this.usuarioAtual != null) {
      this.formDados.controls["nome"].setValue(this.usuarioAtual.nome);
      this.formDados.controls["sobrenome"].setValue(this.usuarioAtual.sobrenome);
      this.formDados.controls["email"].setValue(this.usuarioAtual.email);
      this.formDados.controls["dataNascimento"].setValue(this.datePipe.transform(this.usuarioAtual.dataNascimento, "dd/MM/yyyy"));
      this.formDados.controls["escolaridade"].setValue(this.usuarioAtual.escolaridade.id);
    }
  }

  salvar() {
    let usuario = new Usuario();

    usuario.nome = this.formDados.controls["nome"].value;
    usuario.sobrenome = this.formDados.controls["sobrenome"].value;
    usuario.email = this.formDados.controls["email"].value;

    let dataNascimento: Date = new Date(this.formDados.controls["dataNascimento"].value.split(" ")[0].split("/").reverse().join('-'));

    usuario.dataNascimento = dataNascimento;

    usuario.escolaridade = new Escolaridade();

    usuario.escolaridade.id = this.formDados.controls["escolaridade"].value;

    if (this.usuarioAtual == null) {
      let novoUsuario: Usuario = null;

      this.usuarioService.add(usuario).subscribe(
        x => novoUsuario = x,
        error => { console.log("Erro: " + error) },
        () => {
          if (novoUsuario != null) {
            this.router.navigate(["/usuarios-cadastro/" + novoUsuario.id]);
          }
        }
      );
    } else {
      usuario.id = this.usuarioAtual.id;
      
      let alteracao: boolean = false;

      this.usuarioService.update(usuario).subscribe(
        x => alteracao = x,
        error => { console.log("Erro: " + error) },
        () => {
          if (alteracao) {
            this.router.navigate(["/"]);
          }
        }
      );      
    }
  }

  /* Ações */

  enviarFormulario() {
    this.formEnviado = true;

    if (!this.formDados.invalid) {
      this.salvar();
    }
  }
}
