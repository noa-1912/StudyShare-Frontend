import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiChatService {

  private apiUrl = 'http://localhost:8080/api/ai/chat';

  constructor(private http: HttpClient) {}

  // 📤 שולח POST עם body לשרת
  sendMessage(message: string, conversationId: string): Observable<string> {

    const body = {
      message: message,
      conversationId: conversationId
    };

    return this.http.post(this.apiUrl, body, {
      responseType: 'text'     // ⭐ כי השרת מחזיר String
    });
  }
}
