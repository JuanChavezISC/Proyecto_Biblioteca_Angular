import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria-services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.css'
})
export class CategoriaFormComponent implements OnInit {

  public titulo: string = "Crear Categoria";
  public categoria: Categoria = new Categoria();

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {  }

  ngOnInit(): void {
      this.cargarCategoria();
  }

  cargarCategoria(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.categoriaService.getCategoria(id)
        .subscribe((categoria) => this.categoria = categoria) // suscripcion al observable
      }
      console.log(this.categoria);
    })
  }

  public create(): void {
    console.log(this.categoria);
    this.categoriaService.create(this.categoria)
    .subscribe(categoria => {
      this.router.navigate(['/categorias']) // Indica la redireccion al componente categorias
      Swal.fire('Nueva categoria', `Categoria ${this.categoria.descripcion} creada con exito`, 'success')
      }
    );
  }

  update(): void{
    console.log("Categoria a editar" + this.categoria);
    this.categoriaService.update(this.categoria)
    .subscribe(categoria =>{
      this.router.navigate(['/categorias'])
      Swal.fire('Categoria actualizada', `Categoria ${this.categoria.descripcion} actualizada con exito`
        ,'success')
    })
  }
}
