import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autor } from '../../models/autor';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private urlEndPoint: string = 'http://localhost:8080/api/autores';


  private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getAutoresNoPage(): Observable<Autor[]>{

    return this.http.get<Autor[]>(this.urlEndPoint);
  }

  getAutores(page: number): Observable<any>{
    console.log("Ingresa a back Autores")

    return this.http.get<Autor[]>(this.urlEndPoint + '/page/' + page);
  }
  
  getAutor(id:number): Observable<Autor>{
    return this.http.get<Autor>(`${this.urlEndPoint}/${id}`);
  }
  
  create(autor: Autor): Observable<Autor>{
    return this.http.post<Autor>(this.urlEndPoint, autor, {headers: this.httpHeaders});
  }


  update(autor: Autor): Observable<Autor>{
    return this.http.put<Autor>(`${this.urlEndPoint}/${autor.autorId}`, autor, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
