import { Component, OnInit } from '@angular/core';
import { UsersModel } from '../../models/users.model';
import { UsersService } from '../../service/user-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  user: UsersModel | null = null;
  showPopup = false;

  constructor(private userService: UsersService) { }

  // ngOnInit(): void {
  //   // כאן אפשר בעתיד להביא מידע על המשתמש המחובר מהשרת
  //   this.user = JSON.parse(localStorage.getItem('user') || 'null');
  // }

  ngOnInit(): void {
    //   // כאן אפשר  להביא מידע על המשתמש המחובר מהשרת
    this.user = JSON.parse(localStorage.getItem('user') || 'null');

    if (this.user) {
      // פותח את הפופאפ אחרי 700ms כדי שיראה טבעי
      setTimeout(() => {
        this.showPopup = true;
      }, 700);
    }
  }


  showAIPopup = false;

  openAIPopup() {
    this.showAIPopup = true;
  }

  closeAIPopup() {
    this.showAIPopup = false;
  }




  closePopup() {
    this.showPopup = false;
  }


}
