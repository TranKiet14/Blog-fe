import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PostService } from '../../../../services/post.service';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrl: './delete-post.component.scss'
})
export class DeletePostComponent {
  @Input() data: any;
  @Output() onReload = new EventEmitter<any>();
  constructor(
    private postService: PostService,
    private notification: NzNotificationService
  ) { }
  confirm(id: number): void {
    this.postService.delete(id).subscribe(
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
