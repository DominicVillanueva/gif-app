import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) { }

  get busquedas(): string[] {
    return this.gifsService.historiales;
  }


  onClick_obtener_gifs(query: string): void {
    this.gifsService.buscarGifs(query);
  }
}
