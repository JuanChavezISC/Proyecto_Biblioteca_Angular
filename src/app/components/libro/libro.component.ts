import { Component, OnInit } from '@angular/core';
import { Libro } from '../../models/libro';
import { LibroService } from '../../services/libro-services/libro.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent implements OnInit {

  libros: Libro[] = [];

  constructor(private libroService: LibroService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(){
      console.log("listado de libros")
      this.libroService.getLibrosNoPage().subscribe(
        (libros) => {this.libros = libros, console.log(libros)} 
      );
  }

  delete(libro: Libro): void{
    Swal.fire({
      title: 'Confirmacion',
          text: `¿Seguro que deseas eliminar el libro: ${libro.titulo}  ?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.libroService.delete(libro.libroId).subscribe(() =>{
              this.libros = this.libros.filter(lib => lib.libroId !== libro.libroId);
              Swal.fire(
                'Libro eliminado!',
                `Libro ${libro.titulo} eliminado con exito`,
                'success'
              )
            });
          }
    })
  }
}
