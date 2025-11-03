import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SuggestionList } from './components/suggestion-list/suggestion-list';
@Component({
  selector: 'app-root',
  imports: [ SuggestionList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('study-share');
}
