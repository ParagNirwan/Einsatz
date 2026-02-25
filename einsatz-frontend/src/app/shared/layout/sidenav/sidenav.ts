import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet, Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterOutlet,
    MatListModule,
    RouterModule
  ],
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.css']
})
export class Sidenav {

  private authService = inject(AuthService);
  private router = inject(Router);

  menuItems = [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Users', route: '/users' },
    { label: 'Settings', route: '/settings' },
    { label: 'Organization', route: '/organization/create' },
    { label: 'Logout', action: 'logout' }
  ];

  handleClick(item: any) {
    if (item.action === 'logout') {
      this.logout();
    }
  }

  logout() {

    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }

}