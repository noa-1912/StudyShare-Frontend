import { Component, output } from '@angular/core';
import { SuggestionModel } from '../../models/suggestion.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SuggestionService } from '../../service/suggestion-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-suggestion-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suggestion-details.html',
  styleUrl: './suggestion-details.css',
})
export class SuggestionDetails {
  public isUpdateSuggestion: boolean = false
  public suggestionToShow?: SuggestionModel
  onDelete = output<void>();

  constructor(private route: ActivatedRoute, private suggestionService: SuggestionService, private router: Router) { }
  public canDelete = false;

  goBack() {
    this.router.navigate(['/suggestion-list']);
  }
  addSolution() {
    this.router.navigate(['/add-solution'], {
      state: { solution: this.suggestionToShow }
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.suggestionService.getById(id).subscribe({
        next: (res) => {
          this.suggestionToShow = res;

          const userStr = localStorage.getItem('user');
          const loggedUser = userStr ? JSON.parse(userStr) : null;

          // ✔ בדיקה אם המשתמש בעל הבקשה
          this.canDelete = loggedUser && loggedUser.id === this.suggestionToShow?.userDTO?.id;
        },
        error: err => console.log(err)
      });
    });
  }

  onImageError(event: any) {
    event.target.src = 'assets/broken-image.jpg'; // תמונת ברירת מחדל
  }
  delete() {

    if (!this.suggestionToShow || !this.suggestionToShow.id) {
      console.error("Cannot delete – missing id:", this.suggestionToShow);
      return;
    }

    this.suggestionService.delete(this.suggestionToShow.id).subscribe({
      next: () => {
        alert("הבקשה נמחקה בהצלחה!");      // 🟢 אפשר להציג הודעה
        this.router.navigate(['/suggestion-list']); // חוזרים אחרי מחיקה
      },
      error: (err) => console.log(err)
    });
  }





}
