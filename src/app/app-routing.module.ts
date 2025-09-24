import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorComponent } from './components/autor/autor.component';
import { AutorFormComponent } from './components/autor/autor-form/autor-form.component';
import { CategoriaComponent } from './components/categoria/categoria.component';

const routes: Routes = [
  {path: '', redirectTo: '/autores', pathMatch: 'full'},
  {path: 'autores', component: AutorComponent},
  {path: 'autores/form', component: AutorFormComponent},
  {path: 'autores/form/:id', component: AutorFormComponent},
  {path: 'categorias', component: CategoriaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
