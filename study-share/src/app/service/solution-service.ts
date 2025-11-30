import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolutionsModel } from '../models/solutions.model';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  private apiUrl = 'http://localhost:8080/api/solution';

  // נוסיף שמירת נתוני חיפוש
public lastSearchCriteria?: { 
  bookId: number; 
  page: number; 
  exercise: number; 
  section?: number; 
  subSection?: number; 
};

  constructor(private _httpClient: HttpClient) { }
public lastSearchResults: SolutionsModel[] = [];

  // חיפוש פתרון
  searchSolution(bookId: number, page: number, exercise: number): Observable<SolutionsModel[]> {
       this.lastSearchCriteria = { bookId, page, exercise };

    return this._httpClient.get<SolutionsModel[]>(
      `http://localhost:8080/api/solution/searchSolutions/${bookId}/${page}/${exercise}`
    );
  }
   getById(id: number): Observable<SolutionsModel> {
      return this._httpClient.get<SolutionsModel>(`http://localhost:8080/api/solution/getSolutions/${id}`);
    }




  // // אם בעתיד תרצי הוספת פתרון
  // add(solution: any, file?: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('solution', new Blob([JSON.stringify(solution)], { type: 'application/json' }));

  //   if (file) formData.append('image', file);

  //   return this.http.post(`${this.apiUrl}/add`, formData);
  // }





    add(solution: SolutionsModel, file?: File): Observable<SolutionsModel> {
      const formData = new FormData();
      // מצרפים את התמונה אם יש
      if (file) {
        formData.append('image', file); // תואם ל-@RequestPart("image")
      }
     // מצרפים את האובייקט JSON
      formData.append(
        'solution',
        new Blob([JSON.stringify(solution)], { type: 'application/json' })
      );
  
      return this._httpClient.post<SolutionsModel>(
      'http://localhost:8080/api/solution/uploadSolutions', formData
      );
    }
  
}
