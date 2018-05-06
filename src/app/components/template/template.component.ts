import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: []
})
export class TemplateComponent implements OnInit {
  usuario: Usuario = new Usuario();
  constructor() {
    this.usuario = {
      nombre: '',
      apellido: '',
      correo: '',
      pais: '',
      sexo: 3,
      acepta: false
    };
  }

  paises = [{
    codigo: 'CRI',
    nombre: 'Costa Rica'
  }, {
    codigo: 'BO',
    nombre: 'Bolivia'
  }, {
    codigo: 'ES',
    nombre: 'España'
  }
];

  sexos = [{codigo: 1, nombre: 'Hombre'}, { codigo: 2, nombre: 'Mujer'}, { codigo: 3, nombre: 'Sin definir'}];

  ngOnInit() {
  }
  guardar(forma: NgForm) {
    console.log('Formulario postedado', forma);
    console.log('Valores', forma.value);
  }

}

export class Usuario {
  nombre: string;
  apellido: string;
  correo: string;
  pais: string;
  sexo: number;
  acepta: boolean;
}
