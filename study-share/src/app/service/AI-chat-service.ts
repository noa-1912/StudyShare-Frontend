import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiChatService {

  private apiUrl = 'http://localhost:8080/api/ai/chat';

  constructor(private http: HttpClient) { }

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




  streamMessage(message: string, conversationId: string): Observable<string> {

    return new Observable(observer => {

      fetch("http://localhost:8080/api/ai/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, conversationId })
      })


        .then(response => {
          const reader = response.body!.getReader();
          const decoder = new TextDecoder();

          function read() {
            reader.read().then(({ done, value }) => {
              if (done) {
                observer.complete();
                return;
              }

              const text = decoder.decode(value, { stream: true });
              const clean = text.replace(/^data:/gm, "");
              observer.next(clean);

              read();
            });
          }

          read();
        })
        .catch(err => observer.error(err));

    });
  }



}