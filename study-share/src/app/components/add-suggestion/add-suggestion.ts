import { Component } from '@angular/core';
import { SuggestionService } from '../../service/suggestion-service';
import { Router } from '@angular/router';
import { SuggestionModel } from '../../models/suggestion.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  public selectedFile?: File;
  public newSuggestion: SuggestionModel = {

    page: 0,
    exercise: 0,
    section: 0,
    subSection: 0,
    content: '',
    uploadDate: new Date(),
    imagePath: '',//לבדוק
    user: undefined,//לבדוק
    book: undefined//לבדוק

  };





  constructor(private router: Router, private _suggestionService: SuggestionService) { }
  previewUrl: string | ArrayBuffer | null = null;

  onImageSelected(ev: any) {
    const file = ev.target.files?.[0];
    if (file) {
      this.selectedFile = file;

      // יצירת תצוגה מקדימה
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addSuggestion() {
    // this.onAddTask.emit(this.newTask);
    this._suggestionService.add(this.newSuggestion, this.selectedFile).subscribe({
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
