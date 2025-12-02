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
import { AIChat } from './components/ai-chat/ai-chat';
import { MySuggestions } from './components/my-suggestions/my-suggestions';
import { MySolutions } from './components/my-solutions/my-solutions';
import { Footer } from './components/footer/footer';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '', redirectTo: 'suggestion-list', pathMatch: 'full' },

  { path: 'home', component: Home },
  { path: 'solution-results', component: SolutionResults },
  { path: 'solution-details/:id', component: SolutionDetails },
  { path: 'ai-chat', component: AIChat },
  { path: 'my-suggestions', component: MySuggestions },
  { path: 'my-solutions', component: MySolutions },
  { path: 'footer', component: Footer },

  { path: 'suggestion-list', component: SuggestionList },
  { path: 'search-solution', component: SolutionSearchComponent },
  { path: 'suggestion-details/:id', component: SuggestionDetails },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'add-suggestion', component: AddSuggestion },
  { path: 'add-solution', component: AddSolution } // ✅ הוספת הנתיב הזה
];