import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-sider',
  templateUrl: './menu-sider.component.html',
  styleUrl: './menu-sider.component.scss'
})
export class MenuSiderComponent {
  @Input() collapsed = false
}
