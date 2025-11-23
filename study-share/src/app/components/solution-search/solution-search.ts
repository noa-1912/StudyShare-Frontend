

// src/app/components/solution-search/solution-search.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { BooksService } from '../../service/book-service';
import { SolutionService } from '../../service/solution-service';

import { BooksModel } from '../../models/books.model';
import { SolutionsModel } from '../../models/solutions.model';

@Component({
  selector: 'app-solution-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solution-search.html',
  styleUrl: './solution-search.css',
})
export class SolutionSearchComponent {

  // כל הספרים מהשרת
  public allBooks: BooksModel[] = [];

  // מתמטיקה / אנגלית
  public selectedSubject: 'math' | 'english' | '' = '';
  public booksFiltered: BooksModel[] = [];

  // שכבות
  public grades: string[] = ['ט', 'י', 'יא', 'יב'];
  public selectedGrade: 'ט' | 'י' | 'יא' | 'יב' | '' = '';

  // הקריטריונים לחיפוש
  public solution: Partial<SolutionsModel> = {
    page: 0,
    exercise: 0,
    section: 0,
    subSection: 0,
    books: undefined
  };

  // תוצאות החיפוש
  public results: SolutionsModel[] = [];
  public notFound = false;
  public isSearching = false;

  constructor(
    private _booksService: BooksService,
    private _solutionService: SolutionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._booksService.getAll().subscribe({
      next: (books) => {
        this.allBooks = books;
        console.log('📚 Books from server (search):', books);
      },
      error: (err) => {
        console.log('❌ שגיאה בקבלת ספרים:', err);
      },
    });
  }

  // בחירת מקצוע
  onSubjectChange() {
    this.selectedGrade = '';
    this.booksFiltered = [];
    this.solution.books = undefined;
  }

  // בחירת שכבה לאחר בחירת מקצוע
  onGradeChange() {
    if (!this.selectedSubject || !this.selectedGrade) {
      this.booksFiltered = [];
      this.solution.books = undefined;
      return;
    }

    const targetSubjectId = this.selectedSubject === 'math' ? 1 : 2;

    this.booksFiltered = this.allBooks.filter(
      (b) => b.subject?.id === targetSubjectId && b.grade === this.selectedGrade
    );

    console.log('📘 booksFiltered (search):', this.booksFiltered);
  }

  // חיפוש פתרון
  searchSolution() {
    if (!this.solution.books || !this.solution.page || !this.solution.exercise) {
      alert('❗ חובה לבחור ספר, עמוד ותרגיל לחיפוש');
      return;
    }

    const criteria = {
      bookId: (this.solution.books as any).id,
      page: this.solution.page,
      exercise: this.solution.exercise,
      section: this.solution.section,
      subSection: this.solution.subSection
    };

    console.log('🔍 search criteria:', criteria);

    this.isSearching = true;
    this.notFound = false;
    this.results = [];

    this._solutionService.searchSolution(criteria).subscribe({
      next: (solutions) => {
        this.isSearching = false;
        this.results = solutions;
        this.notFound = solutions.length === 0;
        console.log('✅ solutions found:', solutions);
      },
      error: (err) => {
        this.isSearching = false;
        console.log('❌ שגיאה בחיפוש פתרונות:', err);
        alert('ארעה שגיאה בחיפוש הפתרון – בדקי קונסול');
      },
    });
  }
}
