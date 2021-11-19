import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Escolaridade } from '../../models/Escolaridades/escolaridade';

@Injectable({
  providedIn: 'root'
})

export class EscolaridadeService {
  private readonly baseUrl = environment["baseUrl"];
  
  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Observable<Escolaridade[]> {
    return this.http.get<Escolaridade[]>(this.baseUrl + "/Escolaridade/GetAll").pipe(
      catchError(() => {
        return of([]);
      })
    );
  }
}
