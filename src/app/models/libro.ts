import { Autor } from "./autor";
import { Categoria } from "./categoria";

export class Libro{
    libroId: number = 0;
    titulo: string = "";
    isbn: string = "";
    fechaPublicacion: string = "";
    autor: Autor = new Autor();
    categoria: Categoria = new Categoria();
}