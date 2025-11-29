
import { Component } from '@angular/core';//מאפשר ליצור קומפוננטהה
import { Router } from '@angular/router'; // ייבוא לניווט
import { FormsModule } from '@angular/forms'; // ייבוא לטפסים עם ngModel
import { UsersModel } from '../../models/users.model'; // ודא שהמודל מוגדר
import { UsersService } from '../../service/user-service';
import { CommonModule } from '@angular/common';

@Component({//קומפוננטה שמייצגת את דף ההתחברות
  selector: 'app-signin',//שם הקומפוננטה
  standalone: true,//הקומפוננטה עובדת לבד ולא תלויה במודול אחרר
  imports: [FormsModule, CommonModule], // מודול לטפסים
  templateUrl: './signin.html',//מכיל HTML
  styleUrl: './signin.css'
})
export class SigninComponent {//מה יופיע בדף ההתחברות
  constructor(private usersService: UsersService, private router: Router) { } // הזרקת תלויות

  email: string = ''; // משתנה ל-ngModel
  password: string = ''; // משתנה ל-ngModel
  loginError = "";       // הודעת שגיאה שתוצג למסך
  formSubmitted = false; // כדי לדעת אם ניסו להגיש


  onSignin(form: any): void {//הפעלת הפונקציה כאשר שולחצים את הטופס בכפתור התחבר

    this.formSubmitted = true;  // מפעיל הודעות שגיאה על שדות


    if (!form.valid) {
      this.loginError = "נא למלא את כל השדות כנדרש";
      return;  // אם הטופס לא תקין → לא שולחים לשרת
    }

    this.loginError = ""; // איפוס שגיאה לפני ניסיון חדש
    //בדיקת טופס תקין אם שדות לא ריקים
    this.usersService.signin(this.email, this.password).subscribe({
      next: (user: UsersModel) => {
        console.log('התחברת בהצלחה כ:', user);
        alert('התחברות הצליחה!');
        // ✅ שמירת המשתמש האמיתי בלוקאל סטורג'
        localStorage.setItem('user', JSON.stringify(user));
        // ✅ עדכון מצב התחברות
        this.usersService.setLoggedIn(true);
        // ✅ ניתוב לדף הבית
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('שגיאה בהתחברות:', err);
        // ⬅ כאן מכניסים את השגיאה שיופיע למשתמש במסך
        if (err.status === 401){
          alert("אימייל או סיסמה שגויים");
          this.loginError = "אימייל או סיסמה שגויים";
        } 
        else this.loginError = "התחברות נכשלה, נא לנסות שוב";
      }
    });

  }
}
