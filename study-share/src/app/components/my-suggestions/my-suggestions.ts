import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SuggestionModel } from '../../models/suggestion.model';
import { SuggestionService } from '../../service/suggestion-service';

@Component({
  selector: 'app-my-suggestions',
  standalone: true,//לא בטוח
  imports: [CommonModule, RouterModule],
  templateUrl: './my-suggestions.html',
  styleUrl: './my-suggestions.css',
})
export class MySuggestions {

  public suggestionArr: SuggestionModel[] = [];
  public suggestionArrFilter: SuggestionModel[] = [];
  constructor(private router: Router, private _suggestionService: SuggestionService) { }

  ngOnInit(): void {
    this._suggestionService.getAll().subscribe({
      next: (res) => {



        this.suggestionArr = res || [];
        console.log("🔵 כל הבקשות מהשרת:", this.suggestionArr);



        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;

        this.suggestionArrFilter = this.suggestionArr.filter(
          s => s.userDTO?.id === user?.id
        );



        console.log("🟣 אחרי פילטור:", this.suggestionArrFilter);
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

