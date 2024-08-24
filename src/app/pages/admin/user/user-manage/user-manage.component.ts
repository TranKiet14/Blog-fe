import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { formatDate } from '../../../../helper/moment';


@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrl: './user-manage.component.scss'
})
export class UserManageComponent implements OnInit {
  listOfData: any;
  constructor(
    private userService: UserService
  ) { }
  ngOnInit(): void {
    this.getData()
  }
  getData(): void {
    this.userService.getList().subscribe(res => {
      this.listOfData = res.data.map((item: any) => ({
        id: item.id,
        fullName: item.fullName,
        email: item.email,
        avatar: item.avatar,
        role: item.role,
        status: item.status,
        employed: formatDate(item.createdAt),
        updatedat: formatDate(item.updatedAt)
      }))
    })
  }

  handleReload(newValue: boolean) {
    if (newValue) this.getData()
  }

}
