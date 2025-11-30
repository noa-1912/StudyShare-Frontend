import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SolutionsModel } from '../../models/solutions.model';
import { SolutionService } from '../../service/solution-service';

@Component({
  selector: 'app-my-solutions',
  standalone: true,//לא בטוח
  imports: [CommonModule, RouterModule], templateUrl: './my-solutions.html',
  styleUrl: './my-solutions.css',
})
export class MySolutions {


  public solutionArr: SolutionsModel[] = [];
  public solutionArrFilter: SolutionsModel[] = [];

  constructor(private router: Router, private _solutionService: SolutionService) { }

  ngOnInit(): void {

    this._solutionService.getAll().subscribe({

      next: (res) => {

        this.solutionArr = res || [];
        console.log("🔵 כל הפתרונות מהשרת:", this.solutionArr);

        // ✔️ שליפת המשתמש מה-localStorage
        const userStr = localStorage.getItem('user');
        if (!userStr) {
          console.log("❌ אין משתמש מחובר");
          return;
        }

        const user = userStr ? JSON.parse(userStr) : null;
        console.log("🔹 המשתמש המחובר:", user);
        console.log("USER ID:", user.id);
        // ✔️ פילטור — שינינו userDTO ל–user
        this.solutionArrFilter = this.solutionArr.filter(
          s => s.userDTO?.id === user?.id
        );
        console.log(this.solutionArr)


        console.log("🟣 הפתרונות שלי:", this.solutionArrFilter);
      },

      error: (err) => console.error('❌ שגיאה בטעינת פתרונות:', err)
    });
  }




  addSuggestion1(): void {
    this.router.navigate(['/add-solution']);
    // 👆 מעביר אותך לעמוד הוספת הצעה חדשה
  }
  onImageError(event: any) {
    event.target.src = 'assets/broken-image.jpg'; // תמונת ברירת מחדל
  }

  showDetailes(s: SolutionsModel) {
    if (!s || !s.id) {
      console.error("Cannot navigate – missing id:", s);
      return;
    }
    this.router.navigate(['/solution-details', s.id]);
  }


}




