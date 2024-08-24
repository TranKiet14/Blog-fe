import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from '../../../../services/user.service';


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss'
})
export class DeleteUserComponent {
  @Input() data: any;
  @Output() onReload = new EventEmitter<any>();
  constructor(
    private userService: UserService,
    private notification: NzNotificationService
  ) { }
  confirm(id: number): void {
    this.userService.delete(id).subscribe(
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
