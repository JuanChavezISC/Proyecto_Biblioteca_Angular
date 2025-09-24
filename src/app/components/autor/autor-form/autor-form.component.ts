import { Component, OnInit } from '@angular/core';
import { Autor } from '../../../models/autor';
import { AutorService } from '../../../services/autor-services/autor.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-autor-form',
  templateUrl: './autor-form.component.html',
  styleUrls: ['./autor-form.component.css']
})
export class AutorFormComponent implements OnInit {

  public titulo: string = "Crear Autor";
  public autor: Autor = new Autor();

  constructor(
    private autorService: AutorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarAutor();
  }

  cargarAutor(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.autorService.getAutor(id)
        .subscribe((autor) => this.autor = autor) //nos suscribimos al observable en el servicio
      }
      console.log(this.autor);
    })
  }

  public create(): void {
    console.log(this.autor);
    this.autorService.create(this.autor)
      .subscribe(autor => {
        this.router.navigate(['/autores'])// indica que se redireccione al componente autores
        swal.fire('Nuevo autor', `Autor ${this.autor.nombre} creado con exito`, 'success')
      }
    );
  }

  update(): void{
    console.log("Autor a editar" + this.autor);
    this.autorService.update(this.autor)
    .subscribe(autor =>{
      this.router.navigate(['/autores'])
      swal.fire('Autor actualizado', `Autor ${this.autor.nombre} actualizado con exito`
        , 'success')
    })
  }
}
