import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorComponent } from './components/autor/autor.component';

const routes: Routes = [
  {path: '', redirectTo: '/autores', pathMatch: 'full'},
  {path: 'autores', component: AutorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
