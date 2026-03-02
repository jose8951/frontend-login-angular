import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private router = inject(Router);
  currentUser = signal(localStorage.getItem('current_user') || '');

  logout() {
    localStorage.removeItem('session_token');
    localStorage.removeItem('current_user');
    this.router.navigate(['/login']);
  }
}
