import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root' // Service de manera global
})
export class GifsService {

  private apiKey: string = 'H1XPZ1xGTIqc95aYtaRVUk7KIHbTXVb3';
  private serviceURL: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historiales() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    // this._historial = localStorage.getItem('historial');
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string = ''): void {

    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${ this.serviceURL }/search`, { params })
        .subscribe(({ data = [] }) => {
          this.resultados = data;
          localStorage.setItem('resultados', JSON.stringify(this.resultados));
        })
  }
}
