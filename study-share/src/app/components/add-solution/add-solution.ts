import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BooksModel } from '../../models/books.model';
import { SolutionsModel } from '../../models/solutions.model';
import { Router } from '@angular/router';
import { SolutionService } from '../../service/solution-service';
import { BooksService } from '../../service/book-service';

@Component({
  selector: 'app-add-solution',
    standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-solution.html',
  styleUrl: './add-solution.css',
})
export class AddSolution {
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

  public newSolution: SolutionsModel = {
    page: 0,
    exercise: 0,
    section: 0,
    subSection: 0,
    content: '',
    uploadDate: new Date(),
    imagePath: '',//לבדוק
    user: undefined,//לבדוק
    book: undefined//לבדוק
  };

  constructor(private router: Router, private _solutionsService: SolutionService, private _booksService: BooksService) { }
  previewUrl: string | ArrayBuffer | null = null;
  public isFromSolution: boolean = false;

ngOnInit(): void {

  const state = history.state as { solution?: any };

  // ===========================
  // 1) אם הגענו מדף בקשה
  // ===========================
  if (state?.solution) {
    const s = state.solution;
    this.isFromSolution = true;

    // ---- מילוי נתוני הבקשה ----
    this.newSolution.page = s.page;
    this.newSolution.exercise = s.exercise;
    this.newSolution.section = s.section;
    this.newSolution.subSection = s.subSection;

    // שומרים את הספר כפי שקיבלנו מהבקשה (ייתעדכן אחרי טעינת ספרים)
    this.newSolution.book = s.book;

    // ---- מילוי מקצוע ----
    this.selectedSubject = s.book.subject.id === 1 ? "math" : "english";

    // ---- מילוי שכבה ----
    this.selectedGrade = s.book.grade;
  }

  // ===========================
  // 2) טעינת כל הספרים מהשרת
  // ===========================
  this._booksService.getAll().subscribe({
    next: (books) => {
      this.allBooks = books;

      this.booksListMath = books.filter(b => b.subject?.id === 1);
      this.booksListEnglish = books.filter(b => b.subject?.id === 2);

      // אם מגיעים מדף בקשה → צריך להכין booksFiltered ולמצוא את הספר הנכון
      if (this.isFromSolution && this.newSolution.book) {

        const targetSubjectId = this.newSolution.book.subject?.id;
        const targetGrade = this.newSolution.book.grade;
        const targetBookId = this.newSolution.book.id;

        // ---- יצירת booksFiltered ע"פ מקצוע + שכבה ----
        this.booksFiltered = this.allBooks.filter(b =>
          b.subject?.id === targetSubjectId &&
          b.grade === targetGrade
        );

        // ---- למצוא את האובייקט הנכון מתוך booksFiltered ----
        const found = this.booksFiltered.find(b => b.id === targetBookId);
        if (found) {
          this.newSolution.book = found;  
        }
      }
    },
    error: (err) => console.log(err)
  });
}


  //בחירת מקצוע
  onSubjectChange() {
     if (this.isFromSolution) return;
    this.selectedGrade = "";
    this.booksFiltered = [];
  }

  //בחירת כיתה לאחר בחירת מקצוע
  onGradeChange() {
    if (this.isFromSolution) return;
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


  addSolution() {

    // ---------------------
    // 1) להביא את המשתמש
    // ---------------------
    const raw = localStorage.getItem("user");
    if (!raw) {
      alert("❌ לא נמצא משתמש מחובר");
      return;
    }

    // // user הוא אובייקט אמיתי עכשיו
 const user = JSON.parse(raw);


    // // ---------------------
    // // 2) לשלוח רק ID של user
    // // ---------------------
    this.newSolution.user = { id: user.id };

    // ---------------------
    // 3) לשלוח רק ID של book
    // ---------------------
    
    if (this.newSolution.book) {
      this.newSolution.book = { id: this.newSolution.book.id } as any;
    }

    console.log("📤 solution we send:", this.newSolution);

    // ---------------------
    // 4) שליחה לשרת
    // ---------------------
    this._solutionsService.add(this.newSolution, this.selectedFile).subscribe({
      next: (res) => {
        console.log("solution added:", res);
        alert("✅ פתרון נוסף בהצלחה!");
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
        alert("❌ בקשה נכשלה — בדקי קונסול");
      }
    });

  }

}
