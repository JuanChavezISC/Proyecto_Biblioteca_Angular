import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria-services/categoria.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit {

  categorias: Categoria[]=  [];

  constructor(
    private categoriaService: CategoriaService,
    private activatedRoute: ActivatedRoute){}

    ngOnInit() {
        console.log("listado de categorias")
        this.categoriaService.getCategoriasNoPage().subscribe(
          (categorias) => {this.categorias = categorias, console.log(this.categorias)}
        );
    }

    delete(categoria: Categoria): void {
      swal.fire({
        title: 'Confirmacion',
        text: `¿Seguro que deseas eliminar la categoria: ${categoria.descripcion} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.categoriaService.delete(categoria.categoriaId).subscribe(() => {
            this.categorias = this.categorias.filter(aut => aut !== categoria);
            swal.fire(
              'Categoria eliminada!',
              `Categoria ${categoria.descripcion} eliminada con exito`,
              'success'
            )
          });
        }
      })
    }
} 
