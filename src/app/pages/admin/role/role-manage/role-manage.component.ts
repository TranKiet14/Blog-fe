import { Component } from '@angular/core';
import { RoleService } from '../../../../services/role.service';
import { formatDate } from '../../../../helper/moment';

@Component({
  selector: 'app-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrl: './role-manage.component.scss'
})
export class RoleManageComponent {
  listOfData: any;

  constructor(
    private roleService: RoleService,
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.roleService.getList().subscribe(res => {
      this.listOfData = res.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        status: item.status,
        description: item.description,
        createdAt: formatDate(item.createdAt),
        updatedAt: formatDate(item.updatedAt)
      }))
    })
  }

  handleReload(newValue: boolean) {
    if (newValue) this.getData()
  }
}
