import { Component, Inject } from '@angular/core';
import { ValidadorService } from '../../services/validador.service';

@Component({
  selector: 'app-pila',
  standalone: true,
  imports: [],
  templateUrl: './pila.component.html',
  styleUrl: './pila.component.css'
})
export class PilaComponent {


  constructor(private validadorService: ValidadorService){}

  get Pila(){
    return this.validadorService.ContPila;
  }
  
}
