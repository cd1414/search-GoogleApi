import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book, Books } from '../interfaces/book';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookInfoService {

  _baseUrl: string;
  _maxResults: number;
  _page: number;
  _filter: string;

  constructor(
    private http: HttpClient
  ) {
    this.initService();
  }

  initService(): void {
    this._baseUrl = 'https://www.googleapis.com/books/v1/volumes';

    this._maxResults = 10;
    this._page = 0;
  }

  reset(): void {
    this.initService();
  }

  getBookInfo() {
    let startIndex = this._page * this._maxResults;
    let requestUrl = `${this._baseUrl}?q=${this._filter}&startIndex=${startIndex}`;

    return this.http.get<Books>(requestUrl);
  }
}
