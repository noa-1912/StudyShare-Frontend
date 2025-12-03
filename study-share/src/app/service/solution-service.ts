import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolutionsModel } from '../models/solutions.model';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  private apiUrl = 'http://localhost:8080/api/solution';

  // נוסיף שמירת נתוני חיפוש בשביל שימוש עתידי כשנרצה לטעון את התוצאות האחרונות
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

  getAll(): Observable<SolutionsModel[]> {
    return this._httpClient.get<SolutionsModel[]>(`http://localhost:8080/api/solution/getSolution`);
  }
  delete(id: number): Observable<any> {
    console.log(id);
    return this._httpClient.delete<any>(`http://localhost:8080/api/solution/deleteSolution/${id}`);
  }


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

  addWithEmail(solution: SolutionsModel, file: File | null, email: string): Observable<SolutionsModel> {
    const formData = new FormData();

    if (file) formData.append('image', file);

    formData.append('solution', new Blob([JSON.stringify(solution)], { type: 'application/json' }));

    // 📌 חובה עטיפה ב-Blob – אחרת Spring לא מזהה!
    console.log("📧 email we senddddddddddddd:", email);
    formData.append('email', email);

    return this._httpClient.post<SolutionsModel>(
      'http://localhost:8080/api/solution/uploadSolutionsWithEmail',
      formData
    );
  }

}
