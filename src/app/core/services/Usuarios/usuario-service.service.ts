import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Usuario } from '../../models/Usuarios/usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private readonly baseUrl = environment["baseUrl"];
  private headers = new HttpHeaders();

  constructor(
    private http: HttpClient
  ) { }

  public add(usuario: Usuario): Observable<Usuario> {
    this.headers.set("Content-Type", "application/json");

    let data = {
      "id": 0,
      "nome": usuario.nome,
      "sobrenome": usuario.sobrenome,
      "email": usuario.email,
      "dataNascimento": usuario.dataNascimento,
      "escolaridadeId": usuario.escolaridade.id
    };

    return this.http.post<Usuario>(this.baseUrl + "/Usuario/Add", data, { headers: this.headers }).pipe(
      catchError(() => {
        return of(null);
      })
    );
  }

  public getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl + "/Usuario/GetAll").pipe(
      catchError(() => {
        return of([]);
      })
    );
  }

  public getById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.baseUrl + "/Usuario/GetById?id=" + id).pipe(
      catchError(() => {
        return of(null);
      })
    );
  }  

  public delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl + "/Usuario/Delete?id=" + id).pipe(
      catchError(() => {
        return of(false);
      })
    );
  }  

  public update(usuario: Usuario): Observable<boolean> {
    this.headers.set("Content-Type", "application/json");

    let data = {
      "id": usuario.id,
      "nome": usuario.nome,
      "sobrenome": usuario.sobrenome,
      "email": usuario.email,
      "dataNascimento": usuario.dataNascimento,
      "escolaridadeId": usuario.escolaridade.id
    };

    return this.http.put<boolean>(this.baseUrl + "/Usuario/Update", data, { headers: this.headers }).pipe(
      catchError(() => {
        return of(false);
      })
    );
  }  
}
