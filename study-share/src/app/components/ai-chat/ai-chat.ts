import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AiChatService } from '../../service/AI-chat-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-chat.html',
  styleUrl: './ai-chat.css',
})
export class AIChat {

  // 📜 מערך כל ההודעות בשיחה (משתמש + AI)
  messages: { sender: 'user' | 'ai', text: string }[] = [];

  // ✏️ מה שהמשתמש מקליד
  inputMessage: string = '';

  // 🆔 מזהה שיחה כדי שהבוט יזכור שיחות קודמות
  conversationId: string = '';

  constructor(private aiService: AiChatService) {

    // ⬇⬇⬇ כל הקוד הזה **צריך להיות בתוך** הקונסטרקטור
    let savedConversation = localStorage.getItem("aiConversation");

    if (!savedConversation) {
      savedConversation = crypto.randomUUID();
      localStorage.setItem("aiConversation", savedConversation);
    }

    // שומרים את המזהה בשדה של הקלאס
    this.conversationId = savedConversation;
  }

  //   send() {
  //     const text = this.inputMessage.trim();
  //     if (!text) return;

  //     this.messages.push({ sender: 'user', text });

  // this.aiService.sendMessage(text, this.conversationId).subscribe({
  //   next: (res) => this.messages.push({ sender: 'ai', text: res }),
  //   error: (err) => console.error(err)
  // });


  //     this.inputMessage = '';
  //   }
  send() {
    const text = this.inputMessage.trim();
    if (!text) return;

    this.messages.push({ sender: 'user', text });

    this.aiService.streamMessage(text, this.conversationId).subscribe({
      next: chunk => this.addChunk(chunk),
      complete: () => console.log("AI finished")
    });

    this.inputMessage = '';
  }

  addChunk(chunk: string) {
    const last = this.messages[this.messages.length - 1];

    if (!last || last.sender !== 'ai') {
      this.messages.push({ sender: 'ai', text: chunk });
    } else {
      last.text += chunk;
    }
  }
format(text: string): string {
  return text
    .replace(/data:/gi, "")                          // מסיר DATA
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")          // הדגשות Markdown
    .replace(/([^\S\r\n]{2,})/g, " ")                // מוחק רווחים כפולים
    .replace(/(\S)-\s+/g, "$1")                      // מאחד מילים שנשברו
    .replace(/\n{3,}/g, "<br><br>")                  // מנקה 3+ שורות ריקות
    .replace(/\n{2}/g, "<br><br>")                   // פסקה רגילה
    .replace(/\n/g, " ")                             // שורה בודדת → ממשיך רצף
    .trim();
}




}