import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidadorService {
  private cadena: string = '';
  private pila: string = 'z';
  private nuevaPila: string = '';

  constructor() {}

  get ContCadena(): string {
    return this.cadena;
  }

  newCadena(cadena: string) {
    this.cadena = cadena;
  }
  agregarPila(pila: string){
    this.pila = this.pila + pila;
  }
  get ContPila(): string{
    return this.pila;
  }

  vaciarPila(){
    this.pila= 'z';
  }

  desapilar(){
    this.nuevaPila = this.pila.substring(0, this.pila.length - 1);
    this.pila = this.nuevaPila;
  }

  getSize(){
    return this.pila.length;
  }

  isEmpty(){
    if(this.pila === 'z'){
      return true;
    }else{
      return false;
    }
  }

  peek(){
    if(this.isEmpty()){
      return this.pila = 'z';
    };
    return this.pila.charAt(this.pila.length - 1);
  };
}
