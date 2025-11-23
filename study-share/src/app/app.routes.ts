import { Routes } from '@angular/router';
import { SuggestionList } from './components/suggestion-list/suggestion-list';
import { AddSuggestion } from './components/add-suggestion/add-suggestion';
import { SignupComponent } from './components/signup/signup';
import { SigninComponent } from './components/signin/signin';
import { Home } from './components/home/home';
import { SuggestionDetails } from './components/suggestion-details/suggestion-details'; 
import { SolutionSearchComponent } from './components/solution-search/solution-search';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '', redirectTo: 'suggestion-list', pathMatch: 'full' },

  { path: 'home', component: Home },
  { path: 'suggestion-list', component: SuggestionList },
  {path: 'search-solution', component: SolutionSearchComponent},
  {path: 'suggestion-details/:id', component: SuggestionDetails},
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'add-suggestion', component: AddSuggestion } // ✅ הוספת הנתיב הזה
];