
import { Injectable } from '@angular/core';//יבוא של אינגקטבל עבוריצירת עמוד שירות

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersModel } from '../models/users.model';

@Injectable({
  providedIn: 'root' 
})
export class UsersService {
  private apiUrl = 'http://your-backend-url/api/Users'; // החלף ב-URL האמיתי של ה-API

  constructor(private http: HttpClient) {}//מטרת הבנאי היא לבדוק אם המשתמש קיים בשרת
 
  // signin(email: string, password: string): Observable<UsersModel> {//פונקציה זו מתחברת את המשתמש לשרת
    
  //   return this.http.post<UsersModel>(`http://localhost:8080/api/user/signin`, { email, password },  {
  //       responseType: 'text' , // כאן תשאירי בלי 'as json'
  //       withCredentials: true // חשוב כדי שה-cookie יישמר
  //     });// מבצע קריאה לשרת עם שם המשתמש והסיסמה
 
  // }

  signin(email: string, password: string): Observable<string> {
  return this.http.post<string>(
    'http://localhost:8080/api/user/signin',
    { email, password },
    {
      responseType: 'text' as 'json', // ⬅️ זה בדיוק הניסוח הנכון כדי שלא תהיה שגיאת TypeScript
      withCredentials: true            // מאפשר שליחה ושמירה של cookie
    }
  );
}



//   signup(name: string, password: string, email: string, file?: File): Observable<UsersModel> {// פונקציה זו נועדה לרשום משתמש חדש
//  const formData = new FormData();
//     // מצרפים את התמונה אם יש
//     if (file) {
//       formData.append('image', file); // תואם ל-@RequestPart("image")
//     }
//     formData.append(
//       'user',
//       new Blob([JSON.stringify(UsersModel)], { type: 'application/json' })
//     );
//     return this.http.post<UsersModel>(`http://localhost:8080/api/user/signup`, { name, password, email,formData });// מבצע קריאה לשרת כדי לרשום משתמש חדש
   
//   }
signup(name: string, password: string, email: string, file?: File): Observable<UsersModel> {
  const formData = new FormData();

  const userObj = { name, password, email };
  formData.append('user', new Blob([JSON.stringify(userObj)], { type: 'application/json' }));

  if (file) {
    formData.append('image', file); // רק אם נבחר קובץ
  }

  return this.http.post<UsersModel>('http://localhost:8080/api/user/signup', formData);
}


}