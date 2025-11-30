import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { SolutionsModel } from '../../models/solutions.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SolutionService } from '../../service/solution-service';

@Component({
  selector: 'app-solution-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solution-details.html',
  styleUrl: './solution-details.css',
})
export class SolutionDetails {
  public isUpdateSolution: boolean = false
  public solutionToShow?: SolutionsModel
  onDelete = output<void>();
  constructor(private route: ActivatedRoute, private solutionService: SolutionService, private router: Router) { }
  public solutions: SolutionsModel[] = [];
  public canDelete = false;

  goBack() {
    this.router.navigate(['/solution-results']);

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.solutionService.getById(id).subscribe({
        next: (res) => {
          this.solutionToShow = res;

          const userStr = localStorage.getItem('user');
          const loggedUser = userStr ? JSON.parse(userStr) : null;

          // ✔ בדיקה אם המשתמש בעל הבקשה
          this.canDelete = loggedUser && loggedUser.id === this.solutionToShow?.userDTO?.id;
        },
        error: err => console.log(err)
      });
    });
  }
  onImageError(event: any) {
    event.target.src = 'assets/broken-image.jpg'; // תמונת ברירת מחדל
  }

  delete() {

    if (!this.solutionToShow || !this.solutionToShow.id) {
      console.error("Cannot delete – missing id:", this.solutionToShow);
      return;
    }

    this.solutionService.delete(this.solutionToShow.id).subscribe({
      next: () => {
        alert("הפתרון נמחקה בהצלחה!");      // 🟢 אפשר להציג הודעה
        this.router.navigate(['/my-solutions']); // חוזרים אחרי מחיקה
      },
      error: (err) => console.log(err)
    });
  }


}
