import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usario';
import { UsuarioService } from '../../services/usuario-services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit{

  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
      console.log("Listado de Usuarios")
      this.usuarioService.getUsuariosNoPage().subscribe(
        (usuarios) => {this.usuarios = usuarios, console.log(usuarios)}
      );
  }

    delete(usuario: Usuario): void{
      Swal.fire({
        title: 'Confirmacion',
            text: `¿Seguro que deseas eliminar el usuario: ${usuario.nombre}  ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.usuarioService.delete(usuario.usuarioId).subscribe(() =>{
                this.usuarios = this.usuarios.filter(usr => usr !== usuario);
                Swal.fire(
                  'Usuario eliminado!',
                  `Usuario ${usuario.nombre} eliminado con exito`,
                  'success'
                )
              });
            }
      })
    }
}
