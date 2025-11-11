import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SuggestionList } from './components/suggestion-list/suggestion-list';
import { AddSuggestion } from "./components/add-suggestion/add-suggestion";
import { Nav } from './components/nav/nav';
@Component({
  selector: 'app-root',
  standalone: true, // חשוב!
  imports: [RouterOutlet, Nav], // ✅ הוספנו את AddSuggestion
  templateUrl: './app.html',
  styleUrl: './app.css' // ✅ הורדנו את הרווח
})
export class App {
  protected readonly title = signal('study-share');
}
