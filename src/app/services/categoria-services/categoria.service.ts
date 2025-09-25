import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlEndPoint: string = 'http://localhost:8080/api/categorias';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getCategoriasNoPage(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.urlEndPoint);
  }

  getCategorias(page: number): Observable<any>{
    console.log("Ingresa a back Categorias")

    return this.http.get<Categoria[]>(this.urlEndPoint + '/page/'+ page);
  }

  getCategoria(id:number): Observable<Categoria>{
    return this.http.get<Categoria>(`${this.urlEndPoint}/${id}`);
  }

  create(categoria: Categoria): Observable<Categoria>{
    return this.http.post<Categoria>(this.urlEndPoint, categoria, {headers: this.httpHeaders})
  }

  update(categoria: Categoria): Observable<Categoria>{
     return this.http.put<Categoria>(`${this.urlEndPoint}/${categoria.categoriaId}`, categoria, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
