import { Component } from '@angular/core';
import { SuggestionModel } from '../../models/suggestion.model';
import { SuggestionService } from '../../service/suggestion-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggestion-list',
  imports: [],
  templateUrl: './suggestion-list.html',
  styleUrl: './suggestion-list.css',
})
export class SuggestionList {
  
public suggestionArr!: SuggestionModel[]
   constructor(private router: Router, private _suggestionService: SuggestionService) { }
//    this._suggestionService.getAll().subscribe({
//   next: (res) => {
//     this.suggestionArr = res;  // res הוא מערך
//     const count = this.suggestionArr.length;
//   },
//   error: (err) => console.error('Error loading suggestion:', err)
// });
  ngOnInit(): void {
    this._suggestionService.getAll().subscribe({
      next: (res) => {
        this.suggestionArr = res;
        const count = this.suggestionArr.length; // מספר המשימות
   },
      error: (err) => {
        console.error('Error loading suggestion:', err);
      }
    })
  }

}
