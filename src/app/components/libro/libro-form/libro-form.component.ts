import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibroService } from '../../../services/libro-services/libro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Libro } from '../../../models/libro';
import Swal from 'sweetalert2';
import { FechaNoFuturaValidator } from '../../../validators/fecha-no-futura.validator';
import { Autor } from '../../../models/autor';
import { Categoria } from '../../../models/categoria';
import { AutorService } from '../../../services/autor-services/autor.service';
import { CategoriaService } from '../../../services/categoria-services/categoria.service';

@Component({
  selector: 'app-libro-form',
  templateUrl: './libro-form.component.html',
  styleUrls: ['./libro-form.component.css']
})
export class LibroFormComponent implements OnInit {

  public titulo: string = "Crear Libro";
  public libroForm!: FormGroup;
  public libroId: number = 0;

  autores: Autor[] = [];
  categorias: Categoria[] = [];

  constructor(
    private libroService: LibroService,
    private autorService: AutorService,
    private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

      this.libroForm = this.fb.group({
        titulo: ['', [Validators.required, Validators.minLength(3)]],
        isbn: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(14)]],
        fechaPublicacion: ['', [Validators.required, FechaNoFuturaValidator]],
        autor: [null, [Validators.required]],
        categoria: [null, [Validators.required]]
      });

      this.cargarLibro();

      this.libroService.getAutores()
      .subscribe(autor => this.autores = autor);

      this.libroService.getCategorias()
      .subscribe(categoria => this.categorias = categoria)
  }

  cargarAutores(): void{
    this.autorService.getAutoresNoPage().subscribe((data) => this.autores = data);
  }

  cargarCategorias(): void{
    this.categoriaService.getCategoriasNoPage().subscribe((data) => this.categorias = data);
  }

  cargarLibro(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.libroId = +id;
        this.titulo = "Editar libro";
        this.libroService.getLibro(this.libroId)
        .subscribe((libro: Libro) => {
          this.libroForm.patchValue({
            titulo: libro.titulo,
            isbn: libro.isbn,
            fechaPublicacion: libro.fechaPublicacion,
            autor: libro.autor,
            categoria: libro.categoria
          });
        });
      }
    })
  }

  public create(): void {
    if(this.libroForm.invalid) return;
    
    const libro = {
      ...this.libroForm.value,
      fechaPublicacion: this.libroForm.value.fechaPublicacion,
      autorId: this.libroForm.value.autor.autorId,
      categoriaId: this.libroForm.value.categoria.categoriaId
    };

    console.log("Libro a enviar", libro);

    this.libroService.create(libro).subscribe(() =>{
      this.router.navigate(['/libros']) // Redireccion al componente libros
      Swal.fire('Nuevo Libro', `Libro ${libro.titulo} creado con exito`, 'success')
    });
  }
  
  update(): void{
    console.log("Libro a editar " + this.libroForm.value);

    if(this.libroForm.invalid) return;

    const libroEditado: Libro = {libroId: this.libroId, ...this.libroForm.value};

    this.libroService.update(libroEditado)
    .subscribe(()=>{
      this.router.navigate(['/libros'])
      Swal.fire('Libro Actualizado', `Libro ${this.libroForm.value.titulo} actualizado con exito`
        , 'success')
    })
  }

  compararAutor(a1: Autor, a2: Autor): boolean {
    if (a1 === undefined && a2 ===undefined) {
      return true;
    }
    return a1 == null || a2 === null ? false: a1.autorId === a2.autorId;
  }

  compararCategoria(c1: Categoria, c2: Categoria): boolean {
    if (c1 === undefined && c2 ===undefined) {
      return true;
    }
    return c1 == null || c2 === null ? false: c1.categoriaId === c2.categoriaId;
  }
}
