import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { SuggestionModel } from '../models/suggestion.model';
@Injectable({
  providedIn: 'root',
})


export class SuggestionService {
  
  constructor(private _httpClient: HttpClient) { }
  
  getById(id: number): Observable<SuggestionModel> {
    return this._httpClient.get<SuggestionModel>(`http://localhost:8080/api/suggesion/getSuggestion/${id}`);
  }
  getAll(): Observable<SuggestionModel[]> {
    return this._httpClient.get<SuggestionModel[]>(`http://localhost:8080/api/suggesion/getSuggestion`);
  }

  getSuggestionsFromServer(): Observable<SuggestionModel[]> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.id;
    return this._httpClient.get<SuggestionModel[]>(`http://localhost:8080/api/Task/byuserId/${userId}`);
  }
  add(suggestion: SuggestionModel): Observable<SuggestionModel> {
    return this._httpClient.post<SuggestionModel>(`http://localhost:8080/api/suggesion/uploadSuggestion`, suggestion);
  }
  


}
