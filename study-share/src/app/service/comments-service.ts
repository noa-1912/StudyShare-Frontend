import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { CommentsModel } from '../models/comments.model';
@Injectable({
  providedIn: 'root',
})


export class CommentsService {
  

  constructor(private _httpClient: HttpClient) { }

  getById(id: number): Observable<CommentsModel[]> {
    return this._httpClient.get<CommentsModel[]>(`http://localhost:8080/api/comments/getComments/${id}`);
  }


  
    add(comments: any): Observable<CommentsModel> {

      return this._httpClient.post<CommentsModel>('http://localhost:8080/api/comments/uploadComment', comments);
    }



}