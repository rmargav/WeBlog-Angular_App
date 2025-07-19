// import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css'],
// })
// export class HeaderComponent implements OnInit {
//   userEmail: string = '';
//   isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn();

//   constructor(private authService: AuthService) {}

//   ngOnInit(): void {
//     this.userEmail = JSON.parse(localStorage.getItem('user')!).email;
//     this.isLoggedIn$ = this.authService.isLoggedIn();
//   }

//   onLogout() {
//     this.authService.logout();
//   }
// }

// chatGPT code 
// ==============================================================
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userEmail: string = '';
  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Initialize the login observable
    this.isLoggedIn$ = this.authService.isLoggedIn();

    // Subscribe to isLoggedIn and update email when user logs in
    this.isLoggedIn$.subscribe((loggedIn) => {
      if (loggedIn) {
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          this.userEmail = user.email;
        }
      } else {
        this.userEmail = '';
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
