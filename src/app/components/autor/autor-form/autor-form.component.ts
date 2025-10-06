import { Component, OnInit } from '@angular/core';
import { Autor } from '../../../models/autor';
import { AutorService } from '../../../services/autor-services/autor.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-autor-form',
  templateUrl: './autor-form.component.html',
  styleUrls: ['./autor-form.component.css']
})
export class AutorFormComponent implements OnInit {

  public titulo: string = "Crear Autor";
  public autorForm!: FormGroup;
  public autorId: number = 0;

  constructor(
    private autorService: AutorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.autorForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      nacionalidad: ['', [Validators.required, Validators.minLength(3)]],
      fechaNacimiento: ['', Validators.required]
    });

    this.cargarAutor();
  }

  cargarAutor(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.autorId = +id;
        this.titulo = "Editar Autor";
        this.autorService.getAutor(this.autorId)
        .subscribe((autor: Autor) => { //nos suscribimos al observable en el servicio
          this.autorForm.patchValue({
            nombre: autor.nombre,
            apellido: autor.apellido,
            nacionalidad: autor.nacionalidad,
            fechaNacimiento: autor.fechaNacimiento 
          });
        }); 
      }
    })
  }

  public create(): void {

    if (this.autorForm.invalid) return;

    const autor = {
      ...this.autorForm.value,
      fechaNacimiento: this.autorForm.value.fechaNacimiento
    };

    this.autorService.create(autor)
      .subscribe(()=> {
        this.router.navigate(['/autores'])// indica que se redireccione al componente autores
        swal.fire('Nuevo autor', `Autor ${this.autorForm.value.nombre} creado con exito`, 'success')
      }
    );
  }

  update(): void{
    console.log("Autor a editar" + this.autorForm.value);
    
    if (this.autorForm.invalid) return;

    const autorEditado: Autor = {autorId: this.autorId, ...this.autorForm.value};

    this.autorService.update(autorEditado)
    .subscribe(() =>{
      this.router.navigate(['/autores'])
      swal.fire('Autor actualizado', `Autor ${this.autorForm.value.nombre} actualizado con exito`
        , 'success')
    })
  }
}
