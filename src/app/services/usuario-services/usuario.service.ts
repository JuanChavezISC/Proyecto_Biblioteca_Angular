import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/usario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint: string = 'http://localhost:8080/api/usuarios'

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http:HttpClient) { }

  getUsuariosNoPage(): Observable<Usuario[]>{
    
    return this.http.get<Usuario[]>(this.urlEndPoint);
  }

  getUsuarios(page: number): Observable<any>{
    console.log("Ingresa a back de Usuarios")

    return this.http.get<Usuario[]>(this.urlEndPoint + '/page/' + page);
  }

  getUsuario(id:number): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`);
  }

  create(usario:Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.urlEndPoint, usario, {headers: this.httpHeaders});
  }

  update(usuario:Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.urlEndPoint}/${usuario.usuarioId}`, usuario, {headers: this.httpHeaders});
  }
  
  delete(id:number): Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
