import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../service/user-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
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

    if (form.valid) { //בדיקת טופס תקין אם שדות לא ריקים
      const { name, password, email } = form.value; //מקבל את הערכים מהטופס
      this.userService.signup(name, password, email, this.selectedFile).subscribe({
        next: (user) => {
          console.log('הרשמה הצליחה:', user);
          this.router.navigate(['/signin']);
        },
        error: (error) => {
          console.error('הרשמה נכשלה:', error);
          alert('הרשמה נכשלה, נא לנסות שוב.');
        }
      });

    }
  }

}
