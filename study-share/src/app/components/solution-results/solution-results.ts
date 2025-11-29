import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SolutionService } from '../../service/solution-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SolutionsModel } from '../../models/solutions.model';
import { SolutionSearchComponent } from '../solution-search/solution-search';
import { Solutions } from '../solutions-list/solutions-list';

@Component({
  selector: 'app-solution-results',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './solution-results.html',
  styleUrl: './solution-results.css',
})
export class SolutionResults {

  constructor(private router: Router, private _solutionsService: SolutionService) { }

  public solutions: SolutionsModel[] = [];
  public noResult: boolean = false;

  // נתוני החיפוש – מגיעים מהעמוד הקודם
  public bookId?: number;
  public page?: number;
  public exercise?: number;
  public section?: number;
  public subSection?: number;


  ngOnInit() {
    this.solutions = this._solutionsService.lastSearchResults ?? [];

    // קבלת state מהחיפוש
    const nav = this.router.getCurrentNavigation();
    const data = nav?.extras.state as any;

    if (data) {
      this.noResult = data.noResult;
      this.bookId = data.bookId;
      this.page = data.page;
      this.exercise = data.exercise;
      this.section = data.section;
      this.subSection = data.subSection;
    }
  }

  showDetailes(s: SolutionsModel) {
    if (!s || !s.id) {
      console.error("Cannot navigate – missing id:", s);
      return;
    }
    this.router.navigate(['/solution-details', s]);
  }



  onImageError(event: any) {
    event.target.src = 'assets/broken-image.jpg'; // תמונת ברירת מחדל
  }

  // 🔥 יצירת בקשה חדשה עם כל נתוני החיפוש
  goToSuggestionForm() {
    this.router.navigate(['/add-suggestion'], {
      state: {
        bookId: this.bookId,
        page: this.page,
        exercise: this.exercise,
        section: this.section,
        subSection: this.subSection
      }
    });
  }


}
