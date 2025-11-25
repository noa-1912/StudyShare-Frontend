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

  goBack() {
   this.router.navigate(['/solution-results']);

  }
  ngOnInit(): void {

  this.solutions = this.solutionService.lastSearchResults;
    var id: number;
    this.route.params.subscribe((params) => {
      id = params['id']
      this.solutionService.getById(id).subscribe({
        next: (res) => {
          this.solutionToShow = res;

          // ⭐⭐ כאן נוסיף הדפסות בדיקה ⭐⭐
          console.log("📌 solutionToShow =", this.solutionToShow);
          console.log("📚 solutionToShow.book =", this.solutionToShow.book);
          console.log("📚 solutionToShow.books =", this.solutionToShow.book);
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
