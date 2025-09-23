import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autor } from '../../models/autor';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private urlEndPointFindAll: string = 'http://localhost:8080/api/findAllAutors';
  private urlEndPointFindById: string = 'http://localhost:8080/api/findAutorById'
  private urlEndPointSave: string = 'http://localhost:8080/api/saveAutor';
  private urlEndPointUpdate: string = 'http://localhost:8080/api/updateAutor';
  private urlEndPointDelete: string = 'http://localhost:8080/api/deleteAutor';

  private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getAutoresNoPage(): Observable<Autor[]>{

    return this.http.get<Autor[]>(this.urlEndPointFindAll);
  }

  getAutores(page: number): Observable<any>{
    console.log("Ingresa a back Autores")

    return this.http.get<Autor[]>(this.urlEndPointFindAll + '/page/' + page);
  }

  create(autor: Autor): Observable<Autor>{
    return this.http.post<Autor>(this.urlEndPointSave, autor, {headers: this.httpHeaders})
  }

  getAutor(id:number): Observable<Autor>{
    return this.http.get<Autor>(`${this.urlEndPointFindById}/${id}`);
  }

  update(autor: Autor): Observable<Autor>{
    return this.http.put<Autor>(`${this.urlEndPointUpdate}/${autor.autorId}`, autor, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.urlEndPointDelete}/${id}`, {headers: this.httpHeaders});
  }
}
