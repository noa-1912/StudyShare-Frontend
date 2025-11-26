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

  goBack() {
    this.router.navigate(['/suggestion-list']);
  }
 addSolution() {
this.router.navigate(['/add-solution'], {
  state: { solution: this.suggestionToShow }
});
  }
  ngOnInit(): void {
    var id: number;
    this.route.params.subscribe((params) => {
      id = params['id']
      this.suggestionService.getById(id).subscribe({
        next: (res) => {
          this.suggestionToShow = res;

            // ⭐⭐ כאן נוסיף הדפסות בדיקה ⭐⭐
      console.log("📌 suggestionToShow =", this.suggestionToShow);
      console.log("📚 suggestionToShow.book =", this.suggestionToShow.book);
      console.log("📚 suggestionToShow.books =", this.suggestionToShow.book);
        },
        error: (err) => {
          console.log(err);
        }
      })
    })
  }
  onImageError(event: any) {
  event.target.src = 'assets/broken-image.jpg'; // תמונת ברירת מחדל
}




}
