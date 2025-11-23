import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolutionsModel } from '../models/solutions.model';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  private apiUrl = 'http://localhost:8080/api/solution';

  constructor(private http: HttpClient) {}

  // חיפוש פתרון
  searchSolution(solution: any): Observable<SolutionsModel[]> {
    return this.http.post<SolutionsModel[]>(`${this.apiUrl}/search`, solution);
  }

  

  // אם בעתיד תרצי הוספת פתרון
  add(solution: any, file?: File): Observable<any> {
    const formData = new FormData();
    formData.append('solution', new Blob([JSON.stringify(solution)], { type: 'application/json' }));

    if (file) formData.append('image', file);

    return this.http.post(`${this.apiUrl}/add`, formData);
  }
}
