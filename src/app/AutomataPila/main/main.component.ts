import { Component } from '@angular/core';
import { LectorCadenaComponent } from '../lector-cadena/lector-cadena.component';
import { PilaComponent } from '../pila/pila.component';
import { ValidadorService } from '../../services/validador.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [LectorCadenaComponent, PilaComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  constructor(private validadorService: ValidadorService){}

  get cadena(){
    return this.validadorService.ContCadena;
  }
  

  validarCadena(){
    for(let i=0; i<this.cadena.length; i++){
      this.validadorService.agregarPila(this.cadena.charAt(i));
    }
  }

  

}
