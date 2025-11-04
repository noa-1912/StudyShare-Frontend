import { Routes } from '@angular/router';
import { SuggestionList } from './components/suggestion-list/suggestion-list';
import { AddSuggestion } from './components/add-suggestion/add-suggestion';

export const routes: Routes = [
  { path: '', redirectTo: 'suggestion-list', pathMatch: 'full' },
  { path: 'suggestion-list', component: SuggestionList },
  { path: 'add-suggestion', component: AddSuggestion }, // ✅ הוספת הנתיב הזה
];