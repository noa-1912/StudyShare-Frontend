import { Injectable } from '@angular/core';
import { BooksModel } from '../models/books.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private _httpClient: HttpClient) { }

  getAll(): Observable<BooksModel[]> {
    return this._httpClient.get<BooksModel[]>(`http://localhost:8080/api/book/getBooks`);
  }

}
