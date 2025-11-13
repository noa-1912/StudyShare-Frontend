
import { Component } from '@angular/core';//מאפשר ליצור קומפוננטהה
import { Router } from '@angular/router'; // ייבוא לניווט
import { FormsModule } from '@angular/forms'; // ייבוא לטפסים עם ngModel
import { UsersModel } from '../../models/users.model'; // ודא שהמודל מוגדר
import { UsersService } from '../../service/user-service';

@Component({//קומפוננטה שמייצגת את דף ההתחברות
  selector: 'app-signin',//שם הקומפוננטה
  standalone: true,//הקומפוננטה עובדת לבד ולא תלויה במודול אחרר
  imports: [FormsModule], // מודול לטפסים
  templateUrl: './signin.html',//מכיל HTML
  styleUrl: './signin.css'
})
export class SigninComponent {//מה יופיע בדף ההתחברות

  email: string = ''; // משתנה ל-ngModel
  password: string = ''; // משתנה ל-ngModel

  constructor(private usersService: UsersService, private router: Router) { } // הזרקת תלויות

  onSignin(form: any): void {//הפעלת הפונקציה כאשר שולחצים את הטופס בכפתור התחבר
    if (form.valid) { //בדיקת טופס תקין אם שדות לא ריקים
      const { email, password } = form.value;//מקבל את הערכים מהטופס
      //   this.usersService.signin(email, password).subscribe({//קורא לפונקצייה שנמצאית בשירות USERSERVICE והיא זו שמבצעת את הקשה לשרת עי שבודקת אם קיים כזה משתמש במסד הנתונים שבשרת
      //     next: (user: UsersModel) => {//אם ההתחברות הצליחה כאשר נמצא משתמש כזה בשרת
      //       console.log('Signin successful:', user);//מדפיס את השם משתמש שהתחבר
      //       localStorage.setItem('user', JSON.stringify(user)); // שמירת המשתמש בלוקל סטורג
      //       // this.router.navigate(['/home']);
      //     },
      //     error: (error) => {//אם לא נמצא כזה משתמש בשרת 
      //       console.error('התחברות נכשלה:', error);//מדפיסים שגיאה
      //       alert('ההתחברות נכשלה, נא לנסות שוב.');//מציג למשתמש הודעת שגיאה באלרט
      //     }
      //   });
      // }
//       this.usersService.signin(this.email, this.password).subscribe({
//         next: (username: UsersModel)) => {
//           console.log('התחברת בהצלחה כ:', UsersModel.name);
//           alert('התחברות הצליחה!');
//           // ✅ שמירת המשתמש בלוקאל סטורג'
// localStorage.setItem('user', JSON.stringify(UsersModel));
//           // localStorage.setItem('user', JSON.stringify(UsersModel));

//           // כאן את יכולה לשמור את שם המשתמש או לעבור לדף אחר
//              this.usersService.setLoggedIn(true); // ✅ עדכון מצב התחברות חי

//           this.router.navigate(['/home']);
//         },
//         error: (err) => {
//           console.error('שגיאה בהתחברות:', err);
//           alert('התחברות נכשלה');
//         }
//       });

//     }
//   }
// }
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
    alert('התחברות נכשלה');
  }
});
    }
  }
}
