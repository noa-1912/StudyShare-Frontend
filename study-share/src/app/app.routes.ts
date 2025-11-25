import { Routes } from '@angular/router';
import { SuggestionList } from './components/suggestion-list/suggestion-list';
import { AddSuggestion } from './components/add-suggestion/add-suggestion';
import { AddSolution } from './components/add-solution/add-solution';

import { SignupComponent } from './components/signup/signup';
import { SigninComponent } from './components/signin/signin';
import { Home } from './components/home/home';
import { SuggestionDetails } from './components/suggestion-details/suggestion-details'; 
import { SolutionSearchComponent } from './components/solution-search/solution-search';
import { SolutionResults } from './components/solution-results/solution-results';
import { SolutionDetails } from './components/solution-details/solution-details';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '', redirectTo: 'suggestion-list', pathMatch: 'full' },

  { path: 'home', component: Home },
  {path: 'solution-results', component: SolutionResults},
{path: 'solution-details', component: SolutionDetails},
  
  { path: 'suggestion-list', component: SuggestionList },
  {path: 'search-solution', component: SolutionSearchComponent},
  {path: 'suggestion-details/:id', component: SuggestionDetails},
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'add-suggestion', component: AddSuggestion },
  { path: 'add-solution', component: AddSolution } // ✅ הוספת הנתיב הזה
];