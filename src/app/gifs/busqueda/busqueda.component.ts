import { GifsService } from './../services/gifs.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent {

  // ! => Not null operator => Object not null
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>; // Buscar por referencia local en el DOM

  constructor(private gifsService: GifsService) {}

  Buscar() {
    // document.querySelector('input').value = '';
    const valor = this.txtBuscar.nativeElement.value;
    if(valor.trim().length === 0) return;
    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = '';
  }
}
