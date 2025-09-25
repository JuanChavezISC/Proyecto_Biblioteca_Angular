import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../../models/libro';
import { Autor } from '../../models/autor';
import { Categoria } from '../../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private urlEndPoint: string = 'http://localhost:8080/api/libros';
  private urlEndPointAutor: string = 'http://localhost:8080/api/findAllAutors';
  private urlEndPointCategoria: string = 'http://localhost:8080/api/findAllCategories';

  private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  /* Getters de las distintas entidades o modelos */
  getLibrosNoPage(): Observable<Libro[]>{
    return this.http.get<Libro[]>(this.urlEndPoint);
  }

  getLibros(page: number): Observable<any>{
    console.log("Ingresa a back Libros")
    return this.http.get<Libro[]>(this.urlEndPoint + '/page/' + page);
  }

  getLibro(id: number): Observable<Libro>{
    return this.http.get<Libro>(`${this.urlEndPoint}/${id}`);
  }

  getAutor(): Observable<Autor[]>{
    return this.http.get<Autor[]>(this.urlEndPointAutor);
  }

  getCategoria(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.urlEndPointCategoria);
  }

  /* Funciones CRUD */
  create(libro: Libro): Observable<Libro>{
    return this.http.post<Libro>(this.urlEndPoint, libro, {headers: this.httpHeaders})
  }

  update(libro:Libro): Observable<Libro>{
    return this.http.put<Libro>(`${this.urlEndPoint}/${libro.libroId}`, libro, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint
    }/${id}`, {headers: this.httpHeaders});
  }
}
