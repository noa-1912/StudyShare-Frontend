
import { Injectable } from '@angular/core';//יבוא של אינגקטבל עבוריצירת עמוד שירות

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersModel } from '../models/users.model';


import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://your-backend-url/api/Users'; // החלף ב-URL האמיתי של ה-API

  // מצב התחברות נוכחי (נניח false בתחילה)
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('user'));
  loggedIn$ = this.loggedIn.asObservable();


  constructor(private http: HttpClient) { }//מטרת הבנאי היא לבדוק אם המשתמש קיים בשרת


  
  //הרשמות
  signup(name: string, password: string, email: string, file?: File): Observable<UsersModel> {
    const formData = new FormData();

    const userObj = { name, password, email };
    formData.append('user', new Blob([JSON.stringify(userObj)], { type: 'application/json' }));

    if (file) {
      formData.append('image', file); // רק אם נבחר קובץ
    }

    return this.http.post<UsersModel>('http://localhost:8080/api/user/signup', formData);
  }

  
  //התחברות
  signin(email: string, password: string): Observable<UsersModel> {
    return this.http.post<UsersModel>(
      'http://localhost:8080/api/user/signin',
      { email, password },   // מה נשלח לשרת
      {
        withCredentials: true            // מאפשר שליחה ושמירה של cookie
      }
    );
  }



  //התנתקות
  signout(): Observable<any> {
    return this.http.post(
      `http://localhost:8080/api/user/signout`,
      {},
      {
        withCredentials: true,
        responseType: 'text' as 'json'  // ✅ מגדירים שהתגובה היא טקסט רגיל
      }
    );
  }



  // נעדכן את מצב ההתחברות
  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  // פונקציה עזר לבדוק אם המשתמש מחובר
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');// בודק אם יש משתמש שמור ב-localStorage
  }



}