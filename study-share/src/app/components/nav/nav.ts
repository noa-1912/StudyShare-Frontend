import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UsersService } from '../../service/user-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ הוספת שורה זו

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})

export class NavComponent implements OnInit {
  isLoggedIn = false;
  constructor(private usersService: UsersService, private router: Router) { }

  // ngOnInit() {
  //   this.isLoggedIn = this.usersService.isLoggedIn();
  // }
  ngOnInit() {
    console.log('✅ NavComponent נטען');
    this.usersService.loggedIn$.subscribe((status: boolean) => {
      console.log('🔹 שינוי מצב התחברות:', status);
      this.isLoggedIn = status;
    });

    console.log('🔸 מצב התחלתי לפי localStorage:', this.usersService.isLoggedIn());
    this.isLoggedIn = this.usersService.isLoggedIn();
  }


  // onSignOut() {
  //   this.usersService.signout().subscribe({
  //     next: () => {
  //       localStorage.clear();      // מוחק נתוני משתמש מקומי
  //       this.isLoggedIn = false;   // מעדכן את הסטטוס
  //       this.router.navigate(['/signin']); // שולח לעמוד ההתחברות
  //     },
  //     error: (err: any) => console.error('שגיאה בהתנתקות:', err)
  //   });
  // }
  onSignOut() {
    this.usersService.signout().subscribe({
      next: () => {
        localStorage.clear();               // מוחק נתוני משתמש
        this.usersService.setLoggedIn(false); // ✅ עדכון מצב חי
        this.router.navigate(['/signin']);  // מעבר לעמוד ההתחברות
      },
      error: (err: any) => console.error('שגיאה בהתנתקות:', err)
    });
  }
}
