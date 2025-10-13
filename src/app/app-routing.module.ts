import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorComponent } from './components/autor/autor.component';
import { AutorFormComponent } from './components/autor/autor-form/autor-form.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { CategoriaFormComponent } from './components/categoria/categoria-form/categoria-form.component';
import { LibroComponent } from './components/libro/libro.component';
import { LibroFormComponent } from './components/libro/libro-form/libro-form.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioFormComponent } from './components/usuario/usuario-form/usuario-form.component';

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
  
  /*Usuario Path */
  {path: 'usuarios', component:UsuarioComponent},
  {path: 'usuarios/form', component:UsuarioFormComponent},
  {path: 'usuarios/form/:id', component:UsuarioFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
