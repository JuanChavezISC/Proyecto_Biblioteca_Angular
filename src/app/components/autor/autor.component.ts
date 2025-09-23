import { Component, OnInit } from '@angular/core';
import { Autor } from '../../models/autor';
import { AutorService } from '../../services/autor-services/autor.service';
import { ActivatedRoute } from '@angular/router';

import swal from 'sweetalert2';
import { response } from 'express';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {

  autores: Autor[] = [];

  constructor(private autorService: AutorService,
      private activatedRoute: ActivatedRoute ) {}

      ngOnInit() {
          console.log("listado de autores")
          this.autorService.getAutoresNoPage().subscribe(
            (autores) => {this.autores = autores, console.log(this.autores)}
          );
      }

      delete(autor: Autor): void {
        swal.fire({
          title: 'Confirmacion',
          text: `¿Seguro que deseas eliminar el autor: ${autor.nombre} ${autor.apellido}  ?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar'
        }).then((result) => {
          if(result.isConfirmed){
            this.autorService.delete(autor.autorId).subscribe(
              response => {
                this.autores = this.autores.filter(aut => aut !== autor)
                swal.fire(
                  'Autor eliminado!',
                  `Autor ${autor.nombre} ${autor.apellido} eliminado con exito`,
                  'success'
                )
              }
            )
          }
        })
      }
}
