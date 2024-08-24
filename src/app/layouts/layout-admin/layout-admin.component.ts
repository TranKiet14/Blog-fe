import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { deleteAllCookies } from '../../helper/cookie';



@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrl: './layout-admin.component.scss'
})
export class LayoutAdminComponent {
  collapsed: boolean = false;
  setCollapsed() {
    this.collapsed = !this.collapsed
  }
  constructor(
    private authService: AuthService
  ) {}
  
  logout() {
    this.authService.logout().subscribe()
    deleteAllCookies()
    localStorage.removeItem('user')
  }
}
