import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { SolutionsModel } from '../../models/solutions.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SolutionService } from '../../service/solution-service';
import { CommentsService } from '../../service/comments-service';
import { CommentsModel } from '../../models/comments.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-solution-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solution-details.html',
  styleUrl: './solution-details.css',
})
export class SolutionDetails {

  public isUpdateSolution: boolean = false
  public solutionToShow?: SolutionsModel
  onDelete = output<void>();
  constructor(private route: ActivatedRoute, private solutionService: SolutionService, private router: Router, private commentsService: CommentsService) { }
  public solutions: SolutionsModel[] = [];
  public comments: CommentsModel[] = [];
  public canDelete = false;

  goBack() {
    this.router.navigate(['/solution-results']);

  }

  ngOnInit(): void {
  this.route.params.subscribe(params => {
    const id = params['id'];

    /* ---------------------------------------------------
       📌 שלב 1: טעינת תגובות + חישוב ממוצע דירוג
    --------------------------------------------------- */
    this.commentsService.getById(id).subscribe({
      next: (res) => {
        this.comments = res || [];
        console.log("📌 Comments Loaded:", this.comments);

        // חישוב ממוצע
        
       
      },
      error: err => console.log("שגיאה בטעינת תגובות:", err)
    });


    /* ---------------------------------------------------
       📌 שלב 2: טעינת פרטי הפתרון
    --------------------------------------------------- */
    this.solutionService.getById(id).subscribe({
      next: (res) => {
        this.solutionToShow = res;

        // זיהוי משתמש מחובר
        const userStr = localStorage.getItem('user');
        const loggedUser = userStr ? JSON.parse(userStr) : null;

        // בדיקה אם בעל הפתרון = המשתמש המחובר
        this.canDelete =
          loggedUser && loggedUser.id === this.solutionToShow?.userDTO?.id;
      },
      error: err => console.log("שגיאה בטעינת הפתרון:", err)
    });

  });
}

  onImageError(event: any) {
    event.target.src = 'assets/broken-image.jpg'; // תמונת ברירת מחדל
  }

  delete() {

    if (!this.solutionToShow || !this.solutionToShow.id) {
      console.error("Cannot delete – missing id:", this.solutionToShow);
      return;
    }

    this.solutionService.delete(this.solutionToShow.id).subscribe({
      next: () => {
        alert("הפתרון נמחקה בהצלחה!");      // 🟢 אפשר להציג הודעה
        this.router.navigate(['/my-solutions']); // חוזרים אחרי מחיקה
      },
      error: (err) => console.log(err)
    });
  }





  newCommentText = "";
  newRating = 5;

  addComment() {

        const raw = localStorage.getItem("user");
    if (!raw) {
      alert("❌ לא נמצא משתמש מחובר");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user")!);

    const body = {

      commentText: this.newCommentText,
      ratingValue: this.newRating,
      commentDate: new Date(),              // ← חובה! מוסיף תאריך
      user: { id: user.id },
      solution: { id: this.solutionToShow!.id }
    };

    this.commentsService.add(body).subscribe({
      next: (saved) => {
        this.comments.push(saved);
        this.newCommentText = "";
        this.newRating = 5;
      },
      error: err => console.log("❌ Error:", err)
    });
  }













}
