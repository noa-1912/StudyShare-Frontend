import { Component } from '@angular/core';
import { SuggestionService } from '../../service/suggestion-service';
import { Router } from '@angular/router';
import { SuggestionModel } from '../../models/suggestion.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersModel } from '../../models/users.model';
import { BooksModel } from '../../models/books.model';

@Component({
  selector: 'app-add-suggestion',
   standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-suggestion.html',
  styleUrl: './add-suggestion.css',
})
export class AddSuggestion {

  public newSuggestion:SuggestionModel = {
    id: 0,
    page: 0,
    exercise: 0,  
    section: 0,
    subSection: 0,
    content: '',
    uploadDate: new Date(),
    imagePath: '',//לבדוק
    user: undefined,//לבדוק
    book: undefined,//לבדוק
    image: ''
  }  ;





    constructor(private router: Router, private _suggestionService: SuggestionService  ) { }
  addSuggestion() {
    // this.onAddTask.emit(this.newTask);
    this._suggestionService.add(this.newSuggestion).subscribe({
      next: (res) => {
        console.log('Suggestion added successfully:', res);
        this.router.navigate(['/suggestion-list']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  







}
