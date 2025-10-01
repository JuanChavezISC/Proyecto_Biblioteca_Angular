import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria-services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.css'
})
export class CategoriaFormComponent implements OnInit {

  public titulo: string = "Crear Categoria";
  public categoriaForm!: FormGroup;
  public categoriaId: number = 0;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {  }

  ngOnInit(): void {

    this.categoriaForm = this.fb.group({
      descripcion: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.cargarCategoria();

  }

  cargarCategoria(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.categoriaId = +id;
        this.titulo = "Editar categoria";
        this.categoriaService.getCategoria(this.categoriaId)
        .subscribe((categoria: Categoria) => {
          this.categoriaForm.patchValue({
            descripcion: categoria.descripcion
          });
        }); // suscripcion al observable
      }
    })
  }

  public create(): void {

    if (this.categoriaForm.invalid) return;

    const categoria = {
      ...this.categoriaForm.value
    }

    this.categoriaService.create(categoria)
    .subscribe(() => {
      this.router.navigate(['/categorias']) // Indica la redireccion al componente categorias
      Swal.fire('Nueva categoria', `Categoria ${this.categoriaForm.value.descripcion} creada con exito`, 'success')
      }
    );
  }

  update(): void{
    console.log("Categoria a editar" + this.categoriaForm.value);

    if (this.categoriaForm.invalid) return;
    
    const categoriaEditada: Categoria = {id: this.categoriaId, ...this.categoriaForm.value};

    this.categoriaService.update(categoriaEditada)
    .subscribe(() =>{
      this.router.navigate(['/categorias'])
      Swal.fire('Categoria actualizada', `Categoria ${this.categoriaForm.value.descripcion} actualizada con exito`
        ,'success')
    })
  }
}
