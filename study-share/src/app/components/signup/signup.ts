import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../service/user-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { from } from 'rxjs';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],//תפקידה לאפשר שימוש ב-ngModel בטופס
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']

})
export class SignupComponent {

  //מתחילים עם משתנים עבור מה שהמשתמש יכניס לטוםס
  name: string = '';//יופיע בטופס מה שיכניס המשתמש באפליקציה
  password: string = '';
  email: string = '';
  imagePath: string = '';
  public selectedFile?: File;
  formSubmitted: boolean = false;
  errorMsg = ""; // יציג הודעת שגיאה מהשרת


  constructor(private userService: UsersService, private router: Router) {

  }
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

  //ניצור פונקציה שתופעל כאשר נשלחת בקשת ההרשמה
  onSignup(form: any): void {

    this.formSubmitted = true;   // ← מפעיל הצגת הודעות שגיאה כולל תמונה ❗


    if (!form.valid) {// בודק אם יש טעויות בטופס לפני שליחה לשרת
      alert('נא למלא את כל השדות כראוי.');
      return;
    }

    if (!this.selectedFile) {// בודק אם נבחרה תמונת פרופיל
      alert("חובה לבחור תמונת פרופיל 📷");
      return;
    }


    const { name, password, email } = form.value; //מקבל את הערכים מהטופס
    this.userService.signup(name, password, email, this.selectedFile).subscribe({
      next: (user) => {
        console.log('הרשמה הצליחה:', user);
        this.router.navigate(['/signin']);
      },
      error: (error) => {
        console.error('הרשמה נכשלה:', error.error);
        alert(this.errorMsg = error.error);
      }
    });

  }
}


