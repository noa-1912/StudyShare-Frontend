import { Component } from '@angular/core';
import { SuggestionService } from '../../service/suggestion-service';
import { Router } from '@angular/router';
import { SuggestionModel } from '../../models/suggestion.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersModel } from '../../models/users.model';
import { BooksModel } from '../../models/books.model';
import { BooksService } from '../../service/book-service';

@Component({
  selector: 'app-add-suggestion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-suggestion.html',
  styleUrl: './add-suggestion.css',
})

export class AddSuggestion {
  public selectedFile?: File;
  // 📘 כל הספרים
  public allBooks: BooksModel[] = [];
  // 📘 מתמטיקה / אנגלית
  public booksListMath: BooksModel[] = [];
  public booksListEnglish: BooksModel[] = [];
  // 📘 שכבות
  public grades: string[] = ["ט", "י", "יא", "יב"];
  // 📘 בחירות של התלמידה
  public selectedSubject: "math" | "english" | "" = "";
  public selectedGrade: "ט" | "י" | "יא" | "יב" | "" = "";
  // 📘 ספרים מסוננים שיוצגו בתפריט האחרון
  public booksFiltered: BooksModel[] = [];

  public newSuggestion: SuggestionModel = {
    page: 0,
    exercise: 0,
    section: 0,
    subSection: 0,
    content: '',
    uploadDate: new Date(),
    imagePath: '',//לבדוק
    userDTO: undefined,//לבדוק
    book: undefined//לבדוק
  };

  constructor(private router: Router, private _suggestionService: SuggestionService, private _booksService: BooksService) { }
  previewUrl: string | ArrayBuffer | null = null;

  public isFromSuggestion: boolean = false;

  ngOnInit(): void {

    const state = history.state?.suggestion;
    console.log("📥 STATE RECEIVED:", state);

    if (state) {
      this.newSuggestion.page = state.page;
      this.newSuggestion.exercise = state.exercise;
      this.newSuggestion.section = state.section;
      this.newSuggestion.subSection = state.subSection;
    }

    // טוען ספרים ואז מחפש את הצודק לפי ID
    this._booksService.getAll().subscribe(res => {

      this.allBooks = res;

      if (state?.bookId) {
        const book = this.allBooks.find(b => b.id === state.bookId);
        if (book) {
          this.newSuggestion.book = book;
          this.selectedGrade = book.grade;
          this.selectedSubject = book.subject?.id === 1 ? "math" : "english";
          this.booksFiltered = this.allBooks.filter(b => b.subject?.id === book.subject?.id && b.grade === book.grade);
        }
      }

    });

  }

  //בחירת מקצוע
  onSubjectChange() {
    if (this.isFromSuggestion) return;
    this.selectedGrade = "";
    this.booksFiltered = [];
  }

  //בחירת כיתה לאחר בחירת מקצוע
  onGradeChange() {
    if (this.isFromSuggestion) return;
    if (!this.selectedSubject || !this.selectedGrade) {
      this.booksFiltered = [];
      return;
    }

    // נזהה איזה SUBJECT_ID תואם
    const targetSubjectId = this.selectedSubject === "math" ? 1 : 2;

    this.booksFiltered = this.allBooks.filter(b =>
      b.subject?.id === targetSubjectId &&
      b.grade === this.selectedGrade
    );

    console.log("📘 booksFiltered:", this.booksFiltered);

  }



  onImageSelected(ev: any) {
    const file = ev.target.files?.[0];
    if (file) {
      this.selectedFile = file;

      // יצירת תצוגה מקדימה
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }




  addSuggestion() {

    // 1) שליפה מה־localStorage
    const raw = localStorage.getItem("user");                 // מביא מידע על המשתמש המחובר
    if (!raw) {                                              // אם לא קיים → אין משתמש מחובר
      alert("❗ עלייך להתחבר לפני הוספת בקשה");
      return;
    }

    const user = JSON.parse(raw);             // הופך את ה־string לאובייקט אמיתי
    this.newSuggestion.user = { id: user.id };               // שולח לשרת רק את ה־ID הדרוש

    // 2) הכנסת book בתור ID בלבד — מה ששרת מצפה לו
    if (this.newSuggestion.book) {
      this.newSuggestion.book = { id: this.newSuggestion.book.id } as any;
    }

    // 3) בדיקה לוגית לפני שליחה
    if (!this.newSuggestion.content) {
      alert("נא לכתוב תוכן בקשה לפני שליחה");
      return;
    }

    // 4) שליחה לשרת
    this._suggestionService.add(this.newSuggestion, this.selectedFile).subscribe({
      next: () => {
        alert("✔ בקשה נוספה בהצלחה!");
        this.router.navigate(['/suggestion-list']);          // מעבר לרשימת בקשות
      },
      error: () => alert("❌ הבקשה נכשלה — בדקי קונסול")
    });
  }






}