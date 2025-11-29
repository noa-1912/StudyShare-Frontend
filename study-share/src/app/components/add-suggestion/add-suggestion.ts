// import { Component } from '@angular/core';
// import { SuggestionService } from '../../service/suggestion-service';
// import { Router } from '@angular/router';
// import { SuggestionModel } from '../../models/suggestion.model';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { UsersModel } from '../../models/users.model';
// import { BooksModel } from '../../models/books.model';
// import { BooksService } from '../../service/book-service';

// @Component({
//   selector: 'app-add-suggestion',
//   standalone: true,
//   imports: [FormsModule, CommonModule],
//   templateUrl: './add-suggestion.html',
//   styleUrl: './add-suggestion.css',
// })

// export class AddSuggestion {
//   public selectedFile?: File;
//   // 📘 כל הספרים
//   public allBooks: BooksModel[] = [];
//   // 📘 מתמטיקה / אנגלית
//   public booksListMath: BooksModel[] = [];
//   public booksListEnglish: BooksModel[] = [];
//   // 📘 שכבות
//   public grades: string[] = ["ט", "י", "יא", "יב"];
//   // 📘 בחירות של התלמידה
//   public selectedSubject: "math" | "english" | "" = "";
//   public selectedGrade: "ט" | "י" | "יא" | "יב" | "" = "";
//   // 📘 ספרים מסוננים שיוצגו בתפריט האחרון
//   public booksFiltered: BooksModel[] = [];

//   public newSuggestion: SuggestionModel = {
//     page: 0,
//     exercise: 0,
//     section: 0,
//     subSection: 0,
//     content: '',
//     uploadDate: new Date(),
//     imagePath: '',//לבדוק
//     user: undefined,//לבדוק
//     book: undefined//לבדוק
//   };

//   constructor(private router: Router, private _suggestionService: SuggestionService, private _booksService: BooksService) { }
//   previewUrl: string | ArrayBuffer | null = null;
//   // ngOnInit() {
//   //   this.booksList = this._booksService.getAllBooks();
//   // }

//   ngOnInit(): void {
//   this._booksService.getAll().subscribe({
//     next: (books) => {
//       this.allBooks = books;

//    this.booksListMath = books.filter(b => b.subject?.id === 1);
// this.booksListEnglish = books.filter(b => b.subject?.id === 2);
//       console.log("📚 Books from server:", books);

//     },
//     error: (err) => {
//       console.log("❌ שגיאה בקבלת ספרים:", err);
//     }
//   });
// }



//   //בחירת מקצוע
//   onSubjectChange() {
//     this.selectedGrade = "";
//     this.booksFiltered = [];
//   }

//   //בחירת כיתה לאחר בחירת מקצוע
// onGradeChange() {
//   if (!this.selectedSubject || !this.selectedGrade) {
//     this.booksFiltered = [];
//     return;
//   }

//   // נזהה איזה SUBJECT_ID תואם
//   const targetSubjectId = this.selectedSubject === "math" ? 1 : 2;

//   this.booksFiltered = this.allBooks.filter(b =>
//     b.subject?.id === targetSubjectId &&
//     b.grade === this.selectedGrade
//   );

//   console.log("📘 booksFiltered:", this.booksFiltered);

// }




//   onImageSelected(ev: any) {
//     const file = ev.target.files?.[0];
//     if (file) {
//       this.selectedFile = file;

//       // יצירת תצוגה מקדימה
//       const reader = new FileReader();
//       reader.onload = () => {
//         this.previewUrl = reader.result;
//       };
//       reader.readAsDataURL(file);
//     }
//   }



//   // addSuggestion() {
//   //     console.log('📤 suggestion we send:', this.newSuggestion);

//   //   const userStr = localStorage.getItem('user');
//   //   if (!userStr) {
//   //     alert('❌ לא נמצא משתמש מחובר — תבדקי שהתחברת!');
//   //     return;
//   //   }
//   //   let user = JSON.parse(userStr);
//   //   if (typeof user === 'string') {
//   //     user = JSON.parse(user);
//   //   }
//   //   console.log('✅ fixed user:', user);
//   //   console.log('user.id:', user.id);

//   //   console.log('📦 user from localStorage:', user);

//   //   if (!user.id) {
//   //     alert('❌ לא נמצא משתמש מחובר — תבדקי שהתחברת!');
//   //     return;
//   //   }
//   //   this.newSuggestion.user = { id: user.id };
//   //   // this.onAddTask.emit(this.newTask);
//   //   this._suggestionService.add(this.newSuggestion, this.selectedFile).subscribe({
//   //     next: (res) => {
//   //       console.log('Suggestion added successfully:', res);
//   //       this.router.navigate(['/suggestion-list']);
//   //     },
//   //     error: (err) => {
//   //       console.log(err);
//   //     }
//   //   })
//   // }



// addSuggestion() {

//   // ---------------------
//   // 1) להביא את המשתמש
//   // ---------------------
//   const raw = localStorage.getItem("user");
//   if (!raw) {
//     alert("❌ לא נמצא משתמש מחובר");
//     return;
//   }

//   // user הוא אובייקט אמיתי עכשיו
//   const user = JSON.parse(JSON.parse(raw));

//   // ---------------------
//   // 2) לשלוח רק ID של user
//   // ---------------------
//   this.newSuggestion.user = { id: user.id };

//   // ---------------------
//   // 3) לשלוח רק ID של book
//   // ---------------------
//   if (this.newSuggestion.book) {
//     this.newSuggestion.book = { id: this.newSuggestion.book.id } as any;
//   }

//   console.log("📤 suggestion we send:", this.newSuggestion);

//   // ---------------------
//   // 4) שליחה לשרת
//   // ---------------------
//   this._suggestionService.add(this.newSuggestion, this.selectedFile).subscribe({
//     next: (res) => {
//       console.log("Suggestion added:", res);
//       this.router.navigate(['/suggestion-list']);
//     },
//     error: (err) => {
//       console.log(err);
//       alert("❌ בקשה נכשלה — בדקי קונסול");
//     }
//   });

// }





// }
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
  // ngOnInit() {
  //   this.booksList = this._booksService.getAllBooks();
  // }

  ngOnInit(): void {
    this._booksService.getAll().subscribe({
      next: (books) => {
        this.allBooks = books;

        this.booksListMath = books.filter(b => b.subject?.id === 1);
        this.booksListEnglish = books.filter(b => b.subject?.id === 2);
        console.log("📚 Books from server:", books);

      },
      error: (err) => {
        console.log("❌ שגיאה בקבלת ספרים:", err);
      }
    });
  }



  //בחירת מקצוע
  onSubjectChange() {
    this.selectedGrade = "";
    this.booksFiltered = [];
  }

  //בחירת כיתה לאחר בחירת מקצוע
  onGradeChange() {
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



  // addSuggestion() {
  //     console.log('📤 suggestion we send:', this.newSuggestion);

  //   const userStr = localStorage.getItem('user');
  //   if (!userStr) {
  //     alert('❌ לא נמצא משתמש מחובר — תבדקי שהתחברת!');
  //     return;
  //   }
  //   let user = JSON.parse(userStr);
  //   if (typeof user === 'string') {
  //     user = JSON.parse(user);
  //   }
  //   console.log('✅ fixed user:', user);
  //   console.log('user.id:', user.id);

  //   console.log('📦 user from localStorage:', user);

  //   if (!user.id) {
  //     alert('❌ לא נמצא משתמש מחובר — תבדקי שהתחברת!');
  //     return;
  //   }
  //   this.newSuggestion.user = { id: user.id };
  //   // this.onAddTask.emit(this.newTask);
  //   this._suggestionService.add(this.newSuggestion, this.selectedFile).subscribe({
  //     next: (res) => {
  //       console.log('Suggestion added successfully:', res);
  //       this.router.navigate(['/suggestion-list']);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   })
  // }



  addSuggestion() {

    // ---------------------
    // 1) להביא את המשתמש
    // ---------------------
    const raw = localStorage.getItem("user");
    if (!raw) {
      alert("❌ לא נמצא משתמש מחובר");
      return;
    }

    // // user הוא אובייקט אמיתי עכשיו
    const user = JSON.parse(JSON.parse(raw));

    // // ---------------------
    // // 2) לשלוח רק ID של user
    // // ---------------------
    this.newSuggestion.user = { id: user.id };

    // ---------------------
    // 3) לשלוח רק ID של book
    // ---------------------
    if (this.newSuggestion.book) {
      this.newSuggestion.book = { id: this.newSuggestion.book.id } as any;
    }

    console.log("📤 suggestion we send:", this.newSuggestion);

    // ---------------------
    // 4) שליחה לשרת
    // ---------------------
    this._suggestionService.add(this.newSuggestion, this.selectedFile).subscribe({
      next: (res) => {
        console.log("Suggestion added:", res);
        this.router.navigate(['/suggestion-list']);
      },
      error: (err) => {
        console.log(err);
        alert("❌ בקשה נכשלה — בדקי קונסול");
      }
    });

  }





}