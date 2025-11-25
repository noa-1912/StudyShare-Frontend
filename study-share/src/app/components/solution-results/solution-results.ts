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


  ngOnInit() {
    this.solutions = this._solutionsService.lastSearchResults;

  }



  onImageError(event: any) {
    event.target.src = 'assets/broken-image.jpg'; // תמונת ברירת מחדל
  }

  showDetailes(s: SolutionsModel) {
    if (!s || !s.id) {
      console.error("Cannot navigate – missing id:", s);
      return;
    }
    this.router.navigate(['/solution-details', s]);
  }
}
