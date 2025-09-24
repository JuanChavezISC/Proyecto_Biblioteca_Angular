import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutorComponent } from './components/autor/autor.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { HttpClientModule } from '@angular/common/http';
import { AutorFormComponent } from './components/autor/autor-form/autor-form.component';
import { FormsModule } from '@angular/forms';
import { CategoriaFormComponent } from './components/categoria/categoria-form/categoria-form.component';
import { LibroComponent } from './components/libro/libro.component';
import { LibroFormComponent } from './components/libro/libro-form/libro-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AutorComponent,
    CategoriaComponent,
    AutorFormComponent,
    CategoriaFormComponent,
    LibroComponent,
    LibroFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
