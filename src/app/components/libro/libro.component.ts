import { Component, OnInit } from '@angular/core';
import { Libro } from '../../models/libro';
import { LibroService } from '../../services/libro-services/libro.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent implements OnInit {

  libros: Libro[] = [];

  constructor(private libroService: LibroService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
      
  }
}
