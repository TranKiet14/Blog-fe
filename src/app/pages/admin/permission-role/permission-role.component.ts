import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-permission-role',
  templateUrl: './permission-role.component.html',
  styleUrl: './permission-role.component.scss'
})
export class PermissionRoleComponent implements OnInit {
  data: any
  permission_role: any
  spinning: boolean = false
  constructor(
    private roleService: RoleService
  ) { }
  ngOnInit(): void {
    this.roleService.getList().subscribe(res => {
      this.data = res.data
      this.permission_role = res.data.map((item: any) => (
        {
          role_id: item.id,
          ids: item.permissions.map((i:any) => i.id)
        }
      ))
    })
  }
  onChange(id: number, permission: number): void {
    for (const item of this.permission_role) {
      if(item.role_id === id){
        item.ids.includes(permission) ? item.ids = item.ids.filter((item :any) => item !== permission) : item.ids.push(permission)
      }
    }
  }
  check(id: number, permission: number): boolean {
    for (const item of this.permission_role) {
      if(item.role_id === id){
        if(item.ids.includes(permission)){
          return true;
        }
      }
    }
    return false
  }
  permission(): void {
    this.spinning = true
    this.roleService.permission(this.permission_role).subscribe(res => this.spinning = false)
  }
}
