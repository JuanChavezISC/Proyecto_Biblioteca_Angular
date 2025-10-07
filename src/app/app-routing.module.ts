import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorComponent } from './components/autor/autor.component';
import { AutorFormComponent } from './components/autor/autor-form/autor-form.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { CategoriaFormComponent } from './components/categoria/categoria-form/categoria-form.component';
import { LibroComponent } from './components/libro/libro.component';
import { LibroFormComponent } from './components/libro/libro-form/libro-form.component';

const routes: Routes = [
  {path: '', redirectTo: '/autores', pathMatch: 'full'},
  /*Autores Path */
  {path: 'autores', component: AutorComponent},
  {path: 'autores/form', component: AutorFormComponent},
  {path: 'autores/form/:id', component: AutorFormComponent},
  /*Categoria Path */
  {path: 'categorias', component: CategoriaComponent},
  {path: 'categorias/form', component: CategoriaFormComponent},
  {path: 'categorias/form/:id', component: CategoriaFormComponent},
  /*Libro Path */
  {path: 'libros', component:LibroComponent},
  {path: 'libros/form', component:LibroFormComponent},
  {path: 'libros/form/:id', component:LibroFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
