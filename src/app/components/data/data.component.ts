import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Observable} from 'rxjs/Observable';
import { reject } from 'q';
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {
  forma: FormGroup;
  usuario: Object = {
    nombrecompleto : {nombre: 'Rafael', apellido: 'Wayar'},
    correo: 'rafael.wt@gmail.com',
    pasatiempos: ['Correr'],
    username: '',
    password1: '',
    password2: ''

  };
  constructor(private fb: FormBuilder) {

    console.log('objeto', this.usuario);
    this.forma = this.fb.group({

      'nombrecompleto': new FormGroup({
        'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'apellido': new FormControl('', [Validators.required, this.validacionPersonalizada]),
      }),
      'correo': new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-z]{2,3}$')]),
      'pasatiempos': new FormArray([
        new FormControl('Correr', Validators.required)
      ]),
       'username': new FormControl('', Validators.required, this.existeUsuario),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl()
    });
    // setear validaciones
    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind( this.forma)
    ]);
    // setear el objeto con el formgroup forma
     this.forma.setValue(this.usuario);

     // Crear observador al formulario para detectar los cambios
/*      this.forma.valueChanges.subscribe( data => {
       console.log('Observable form', data);
     }); */
     // Craer observedos de un solo control del formulario
     this.forma.controls['username'].valueChanges.subscribe( data => {
      console.log('Observable Usurio:', data);
    });
    // Observar el status de un solo form control
    this.forma.controls['username'].statusChanges.subscribe( data => {
      console.log('Observable Usuario statusChanges:', data);
    });


  }

  ngOnInit() {
  }
  guardarCambios() {
    console.log( this.forma.value);
    console.log (this.forma);
    // resetear el formulario para hacer un nuevo registo; estado pristing
    this.forma.reset({
      nombrecompleto : {nombre: '', apellido: ''},
      correo: ''
    });
  }
  agregarPasatiempos() {
    ( <FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }
  validacionPersonalizada( control: FormControl): { [s: string]: boolean} {
    if (control.value === 'hola') {
      return {
        validacionpersonalizada: true
      };
    }
    return null;
  }
  noIgual( control: FormControl): { [s: string]: boolean} {
    const forma: any = this;
    // if (control.value !== this.forma.controls['password1'].value) {
      if (control.value !== forma.controls['password1'].value) {
      return {
        noigual: true
      };
    }
    return null;
  }
  existeUsuario( control: FormControl): Promise<any> | Observable<any> {
    // tslint:disable-next-line:prefer-const
    let promesa = new Promise(
      // tslint:disable-next-line:no-shadowed-variable
      (resolve, reject ) => {
        setTimeout( () => {
          if (control.value === 'admin') {
            // console.log('repetido');
            resolve({ existe: true });
          } else {
            // console.log('no repetido');
            resolve(null);
          }
        }, 3000);
      }
    );
    return promesa;
  }

}
