import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlEndPointFindAll: string = 'http://localhost:8080/api/findAllCategories';
  private urlEndPointFindById: string = 'http://localhost:8080/api/findCategoryById';
  private urlEndPointSave: string = 'http://localhost:8080/api/saveCategory';
  private urlEndPointUpdate: string = 'http://localhost:8080/api/updateCategory';
  private urlEndPointDelete: string = 'http://localhost:8080/api/deleteCategory';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getCategoriasNoPage(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.urlEndPointFindAll);
  }

  getCategorias(page: number): Observable<any>{
    console.log("Ingresa a back Categorias")

    return this.http.get<Categoria[]>(this.urlEndPointFindAll + '/page/'+ page);
  }

  getCategoria(id:number): Observable<Categoria>{
    return this.http.get<Categoria>(`${this.urlEndPointFindById}/${id}`);
  }

  create(categoria: Categoria): Observable<Categoria>{
    return this.http.post<Categoria>(this.urlEndPointSave, categoria, {headers: this.httpHeaders})
  }

  update(categoria: Categoria): Observable<Categoria>{
     return this.http.put<Categoria>(`${this.urlEndPointUpdate}/${categoria.categoriaId}`, categoria, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.urlEndPointDelete}/${id}`, {headers: this.httpHeaders});
  }
}
