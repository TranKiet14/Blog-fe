import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoleService } from '../../../../services/role.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-delete-role',
  templateUrl: './delete-role.component.html',
  styleUrl: './delete-role.component.scss'
})
export class DeleteRoleComponent {
  @Input() data: any;
  @Output() onReload = new EventEmitter<any>();
  constructor(
    private roleService: RoleService,
    private notification: NzNotificationService
  ) { }
  confirm(id: number): void {
    this.roleService.delete(id).subscribe(
      res => {
        this.onReload.emit(true);
        this.notification.create(
          'success',
          'Delete success!!!',
          ''
        );
      },
      error => {
        this.notification.create(
          'error',
          'Delete error!!!',
          ''
        );
      }
    )
  }
}
