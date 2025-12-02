import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';//לא בטוח
import { SuggestionModel } from '../../models/suggestion.model';
import { SuggestionService } from '../../service/suggestion-service';
import { Router, RouterModule } from '@angular/router';
import { AddSuggestion } from '../add-suggestion/add-suggestion';
import { Route } from '@angular/router';

@Component({
  selector: 'app-suggestion-list',
  standalone: true,//לא בטוח
  imports: [CommonModule, RouterModule],
  templateUrl: './suggestion-list.html',
  styleUrl: './suggestion-list.css',
})
export class SuggestionList {

  public suggestionArr: SuggestionModel[] = [];
  constructor(private router: Router, private _suggestionService: SuggestionService) { }

  ngOnInit(): void {
    this._suggestionService.getAll().subscribe({
      next: (res) => {
        this.suggestionArr = (res || []).map(s => ({
          ...s,
          user: s.userDTO  // מוסיפים שדה user שיקל על התבנית
        }));
      },
      error: (err) => console.error('Error loading suggestion:', err)
    });
  }

  addSuggestion1(): void {
    this.router.navigate(['/add-suggestion']);
    // 👆 מעביר אותך לעמוד הוספת הצעה חדשה
  }

  onImageError(event: any) {
    event.target.src = 'assets/broken-image.jpg'; // תמונת ברירת מחדל
  }

  showDetailes(s: SuggestionModel) {
    if (!s || !s.id) {
      console.error("Cannot navigate – missing id:", s);
      return;
    }
    this.router.navigate(['/suggestion-details', s.id]);
  }


}
