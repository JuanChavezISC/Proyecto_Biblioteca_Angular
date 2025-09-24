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

  private urlEndPointFindAll: string = 'http://localhost:8080/api/findAllBooks';
  private urlEndPointFindById: string = 'http://localhost:8080/api/findBookById'
  private urlEndPointSave: string = 'http://localhost:8080/api/saveBook';
  private urlEndPointUpdate: string = 'http://localhost:8080/api/updateBook';
  private urlEndPointDelete: string = 'http://localhost:8080/api/deleteBook';

  private urlEndPointAutor: string = 'http://localhost:8080/api/findAllAutors';
  private urlEndPointCategoria: string = 'http://localhost:8080/api/findAllCategories';

  private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  getLibrosNoPage(): Observable<Libro[]>{
    return this.http.get<Libro[]>(this.urlEndPointFindAll);
  }

  getLibros(page: number): Observable<any>{
    console.log("Ingresa a back Libros")
    return this.http.get<Libro[]>(this.urlEndPointFindAll + '/page/' + page);
  }

  getLibro(id: number): Observable<Libro>{
    return this.http.get<Libro>(`${this.urlEndPointFindById}/${id}`);
  }

  getAutor(): Observable<Autor[]>{
    return this.http.get<Autor[]>(this.urlEndPointAutor);
  }

  getCategoria(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.urlEndPointCategoria);
  }

  create(libro: Libro): Observable<Libro>{
    return this.http.post<Libro>(this.urlEndPointSave, libro, {headers: this.httpHeaders})
  }

  update(libro:Libro): Observable<Libro>{
    return this.http.put<Libro>(`${this.urlEndPointUpdate}/${libro.libroId}`, libro, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.urlEndPointDelete}/${id}`, {headers: this.httpHeaders});
  }
}
