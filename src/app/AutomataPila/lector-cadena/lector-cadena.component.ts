import { Component, Inject } from '@angular/core';
import { ValidadorService } from '../../services/validador.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lector-cadena',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './lector-cadena.component.html',
  styleUrls: ['./lector-cadena.component.css'],
})
export class LectorCadenaComponent {
  cadena: string = '';
  cadenaValidar: string = '';
  cadenaVista: string = '';
  i: number = 0;
  ganaste: boolean = false;
  perdiste: boolean = false;
  intervalo: any;
  q: number = 0;

  constructor(private validadorService: ValidadorService) {}

  validar() {
    this.i = 0;
    this.q = 1;
    this.ganaste = false;
    this.perdiste = false;
    this.cadenaValidar = this.cadena + '0'; // Agregamos un marcador de fin de cadena
    this.validadorService.vaciarPila();
    this.procedimiento();
  }
  procedimiento() {
    this.intervalo = setInterval(() => {
      if (this.i < this.cadenaValidar.length && !this.ganaste && !this.perdiste) {
        const caracterActual = this.cadenaValidar.charAt(this.i);
        const cima = this.validadorService.peek();
        
        console.log(caracterActual, cima, this.q); // Depuración
        switch(this.q){
          case 1:
            this.qState1(caracterActual, cima);
            break;
          case 2:
            this.qState2(caracterActual, cima);
            break;
          case 3:
            this.qState3(caracterActual, cima);
            break;
          case 4:
            this.qState4(caracterActual, cima);
            break;
          case 5:
            this.ganaste = true;
            break;
          default:
            this.perdiste = true;
            break;
        }
      } else {
        clearInterval(this.intervalo);
      }
    }, 500);
  }

  qState1(caracterActual: string, cima: string | null) {
    if(caracterActual === '0' && cima === 'z' ){
        this.q = 5;
    }else if(caracterActual === 'a' && (cima === 'z' || cima ==='a') ){
        this.q = 1;
        this.validadorService.agregarPila(caracterActual);
        this.i++;
    }else if((cima === 'z' || cima === 'a') && caracterActual === 'b'){
        this.q = 2;
        this.validadorService.agregarPila(caracterActual);
        this.i++;
    }else if(caracterActual === 'c' && cima === 'a'){
        this.q =3;
        this.validadorService.desapilar();
        this.i++;
    }else if(caracterActual === 'd' && cima === 'a'){
        this.q = 4;
        this.validadorService.desapilar();
        this.i++;
    }else{
        this.perdiste = true;
    }

  }
  
  qState2(caracterActual: string, cima: string | null){
    if(caracterActual === 'b' && cima === 'b'){
      this.q = 2;
      this.validadorService.agregarPila(caracterActual);
      this.i++;
    }else if(caracterActual === 'c' && cima === 'b'){
      this.q = 3;
      this.validadorService.desapilar();
      this.i++;
    }else if(caracterActual === 'd' && cima === 'b'){
      this.q = 4;
      this.validadorService.desapilar();
      this.i++;
    }else{
      this.perdiste = true;
    }
  }

  qState3(caracterActual: string, cima: string | null){
    if(caracterActual === 'c' && (cima ==='b' || cima === 'a')){
      this.q = 3;
      this.validadorService.desapilar();
      this.i++;
    }else if(caracterActual === 'd' && (cima ==='b' || cima === 'a')){
      this.q = 4;
      this.validadorService.desapilar();
      this.i++;
    }else if(caracterActual === '0' && cima === 'z'){
      this.q = 5;
    }else{
      this.perdiste = true;
    }
  }
 
  qState4(caracterActual: string, cima: string | null){
    if(caracterActual === 'd' && (cima ==='b' || cima === 'a')){
      this.q = 4;
      this.validadorService.desapilar();
      this.i++;
    }else if(caracterActual === '0' && cima === 'z'){
      this.q = 5;
    }else{
      this.perdiste = true;
    }
  }

  qState5(caracterActual: string, cima: string | null){
    this.ganaste = true;
  }
}

//nuevocodigo
        // const caracterActual = this.cadenaValidar.charAt(this.i);
        // const cima = this.validadorService.peek();
        // switch(this.q){
        //   case 1:
        //     if(caracterActual === '0' && cima === 'z' ){
        //       this.q = 5;
        //     }else if(caracterActual === 'a' && (cima === 'z' || cima ==='a') ){
        //       this.q = 1;
        //       this.validadorService.agregarPila(caracterActual);
        //       this.i++;
        //     }else if((cima === 'z' || cima === 'a') && caracterActual === 'b'){
        //       this.q = 2;
        //       this.validadorService.agregarPila(caracterActual);
        //       this.i++;
        //     }else if(caracterActual === 'c' && cima === 'a'){
        //       this.q =3;
        //       this.validadorService.desapilar();
        //       this.i++;
        //     }else if(caracterActual === 'd' && cima === 'a'){
        //       this.q = 4;
        //       this.validadorService.desapilar();
        //       this.i++;
        //     }else{
        //       this.perdiste = true;
        //     }
        //     break;
        //   case 2:
            // if(caracterActual === 'b' && cima === 'b'){
            //   this.q = 2;
            //   this.validadorService.agregarPila(caracterActual);
            //   this.i++;
            // }else if(caracterActual === 'c' && cima === 'b'){
            //   this.q = 3;
            //   this.validadorService.desapilar();
            //   this.i++;
            // }else if(caracterActual === 'd' && cima === 'b'){
            //   this.q = 4;
            //   this.validadorService.desapilar();
            //   this.i++;
            // }else{
            //   this.perdiste = true;
            // }
        //     break;
        //   case 3:
            // if(caracterActual === 'c' && (cima ==='b' || cima === 'a')){
            //   this.q = 3;
            //   this.validadorService.desapilar();
            //   this.i++;
            // }else if(caracterActual === 'd' && (cima ==='b' || cima === 'a')){
            //   this.q = 4;
            //   this.validadorService.desapilar();
            //   this.i++;
            // }else if(caracterActual === '0' && cima === 'z'){
            //   this.q = 5;
            // }else{
            //   this.perdiste = true;
            // }
        //     break;
        //   case 4:
            // if(caracterActual === 'd' && (cima ==='b' || cima === 'a')){
            //   this.q = 4;
            //   this.validadorService.desapilar();
            //   this.i++;
            // }else if(caracterActual === '0' && cima === 'z'){
            //   this.q = 5;
            // }else{
            //   this.perdiste = true;
            // }
        //     break;
        //   case 5:
        //     this.ganaste = true;
        //     break;
        // }

//Lo que tenia dentro del if
        // const currentChar = this.cadenaValidar.charAt(this.i);
        // const caracterAnterior = this.cadenaValidar.charAt(this.i - 1);
        // const peekedChar = this.validadorService.peek();
  
        // switch (currentChar) {
        //   case 'a':
        //     if (peekedChar !== 'b' && (caracterAnterior === 'a' || this.i === 0)) {
        //       this.entroq1 = true;
        //       this.validadorService.agregarPila(currentChar);
        //     } else {
        //       this.perdiste = true;
        //     }
        //     break;
        //   case 'b':
        //     if( this.entroq1 && !this.entroq2 && !this.entroq3 && !this.entroq4 || !this.entroq1 && !this.entroq2 && !this.entroq3 && !this.entroq4){
        //       this.perdiste = true;
        //     }else{
        //       this.entroq1 = true;
        //       if (peekedChar === 'a' || peekedChar === 'z' || peekedChar === 'b' ) {
        //         this.validadorService.agregarPila(currentChar);
        //       } else {
        //         this.perdiste = true;
        //       }
        //     }
        //     break;
        //   case 'c':
        //     if (peekedChar === 'a' || peekedChar === 'b') {
        //       this.validadorService.desapilar();
        //     } else {
        //       this.perdiste = true;
        //     }
        //     break;
        //   case 'd':
        //     if(caracterAnterior === 'c' && this.entroq4){
        //       this.perdiste = true;
        //     }else {
        //       this.entroq4 = true;
        //       if (peekedChar === 'a' || peekedChar === 'b') {
        //         this.validadorService.desapilar();
        //       } else {
        //         this.perdiste = true;
        //       }
        //     }
    
        //     break;
        //   case '0':
        //     if (this.validadorService.isEmpty()) {
        //       this.ganaste = true;
        //     } else {
        //       this.perdiste = true;
        //     }
        //     break;
        //   default:
        //     this.perdiste = true;
        //     break;
        // }
  
        // this.i++;






// @Component({
//   selector: 'app-lector-cadena',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './lector-cadena.component.html',
//   styleUrl: './lector-cadena.component.css',
// })
// export class LectorCadenaComponent {
//   cadena: string = '';
//   cadenaValidar: string = '';
//   i: number = 0;
//   ganaste: boolean = false;
//   perdiste: boolean = false;
//   constructor(private validadorService: ValidadorService) {}
//   get pila() {
//     return this.validadorService.ContPila;
//   }

//   validar() {
//     this.i = 0;
//     this.cadenaValidar = '';
//     this.validadorService.vaciarPila();
//     this.validadorService.newCadena(this.cadena);
//     this.cadenaValidar = this.cadena + '0';
//     this.q1();
//   }

//   procedimiento = () => {
//     this.q1();
//   };

//   q1 = () => {
// if (
//   this.cadenaValidar.charAt(this.i) === 'a' &&
//   this.pila.charAt(this.pila.length) === 'z'
// ) {
//   this.validadorService.agregarPila('x');
//   this.i++;
//   setTimeout(this.q1, 1000);
// }
// if (
//   this.cadenaValidar.charAt(this.i) === 'a' &&
//   this.pila.charAt(this.pila.length) === 'x'
// ) {
//   this.validadorService.agregarPila('x');
//   this.i++;
//   setTimeout(this.q1, 1000);
// }
// if (
//   this.cadenaValidar.charAt(this.i) === 'b' &&
//   this.pila.charAt(this.pila.length) === 'x'
// ) {
//   this.validadorService.agregarPila('x');
//   this.i++;
//   setTimeout(this.q2, 1000);
// }
// if (
//   this.cadenaValidar.charAt(this.i) === 'b' &&
//   this.pila.charAt(this.pila.length) === 'z'
// ) {
//   this.validadorService.agregarPila('x');
//   this.i++;
//   setTimeout(this.q2, 1000);
// }
// if (
//   this.cadenaValidar.charAt(this.i) === 'c' &&
//   this.pila.charAt(this.pila.length) === 'x'
// ) {
//   this.validadorService.desapilar;
//   this.i++;
//   setTimeout(this.q3, 1000);
// }
// if (
//   this.cadenaValidar.charAt(this.i) === 'd' &&
//   this.pila.charAt(this.pila.length) === 'x'
// ) {
//   this.validadorService.desapilar;
//   this.i++;
//   setTimeout(this.q4, 1000);
// }
// this.perdiste = true;
// return;
//   };

//   q2 = () => {
//     if (
//       this.cadenaValidar.charAt(this.i) === 'b' &&
//       this.pila.charAt(this.pila.length) === 'x'
//     ) {
//       this.validadorService.agregarPila('x');
//       this.i++;
//       setTimeout(this.q2, 1000);
//     }
//     if (
//       this.cadenaValidar.charAt(this.i) === 'c' &&
//       this.pila.charAt(this.pila.length) === 'x'
//     ) {
//       this.validadorService.desapilar;
//       this.i++;
//       setTimeout(this.q3, 1000);
//     }
//     if (
//       this.cadenaValidar.charAt(this.i) === 'd' &&
//       this.pila.charAt(this.pila.length) === 'x'
//     ) {
//       this.validadorService.desapilar;
//       this.i++;
//       setTimeout(this.q4, 1000);
//     }
//     this.perdiste = true;
//     return;
//   };

//   q3 = () => {
//     if (
//       this.cadenaValidar.charAt(this.i) === 'c' &&
//       this.pila.charAt(this.pila.length) === 'x'
//     ) {
//       this.validadorService.desapilar;
//       this.i++;
//       setTimeout(this.q3, 1000);
//     }
//     if (
//       this.cadenaValidar.charAt(this.i) === '0' &&
//       this.pila.charAt(this.pila.length) === 'z'
//     ) {
//       setTimeout(this.q5, 1000);
//     }
//     if (
//       this.cadenaValidar.charAt(this.i) === 'd' &&
//       this.pila.charAt(this.pila.length) === 'x'
//     ) {
//       this.validadorService.desapilar;
//       this.i++;
//       setTimeout(this.q4, 1000);
//     }
//     this.perdiste = true;
//     return;
//   };

//   q4 = () => {
//     if (
//       this.cadenaValidar.charAt(this.i) === 'd' &&
//       this.pila.charAt(this.pila.length) === 'x'
//     ) {
//       this.validadorService.desapilar;
//       this.i++;
//       setTimeout(this.q4, 1000);
//     }
//     if (
//       this.cadenaValidar.charAt(this.i) === '0' &&
//       this.pila.charAt(this.pila.length) === 'z'
//     ) {
//       setTimeout(this.q5, 1000);
//     }
//     this.perdiste = true;
//     return;
//   };

//   q5 = () => {
//     if (
//       this.cadenaValidar.charAt(this.i) === '0' &&
//       this.pila.charAt(this.pila.length) === 'z'
//     ) {
//       this.ganaste = true;
//       return;
//     }
//   };
// }
