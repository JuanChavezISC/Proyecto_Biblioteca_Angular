import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario-services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../../models/usario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent implements OnInit{

  public titulo: string = "Crear Usuario";
  public usuarioForm!: FormGroup;
  public usuarioId: number = 0;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
      this.usuarioForm = this.fb.group({
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        apellido: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]]
      });

      this.cargarUsuario();
  }

  cargarUsuario():void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.usuarioId = +id;
        this.titulo = "Editar Usuario";
        this.usuarioService.getUsuario(this.usuarioId)
        .subscribe((usuario: Usuario ) => {
          this.usuarioForm.patchValue({
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email
          });
        });
      }
    })
  }

  /**
   * create
   */
  public create(): void {
    
    if(this.usuarioForm.invalid) return;

    const usuario = {
      ...this.usuarioForm.value
    };

    this.usuarioService.create(usuario)
      .subscribe(() => {
        this.router.navigate(['/usuarios'])
        Swal.fire('Nuevo Usuario', `Usuario ${this.usuarioForm.value.nombre} creado con exito`, 'success')
      });
  }

  update(): void{
    console.log("Usuario a editar" + this.usuarioForm.value);

    if(this.usuarioForm.invalid) return;

    const usuarioEditado: Usuario = {usuarioId: this.usuarioId, ...this.usuarioForm.value};

    this.usuarioService.update(usuarioEditado)
      .subscribe(() =>{
        this.router.navigate(['/usuarios'])
        Swal.fire('Usuario actualizado', `Usuario ${this.usuarioForm.value.nombre} 
          actualizado con exito`, 'success')
      })
  }
}
