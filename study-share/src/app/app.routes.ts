import { Routes } from '@angular/router';
import { AddSuggestion } from './components/add-suggestion/add-suggestion';
import { SuggestionList } from './components/suggestion-list/suggestion-list';
export const routes: Routes = [
 {path: 'add-suggestion', component: AddSuggestion},
{path:'suggestion-list',component:AddSuggestion}];
