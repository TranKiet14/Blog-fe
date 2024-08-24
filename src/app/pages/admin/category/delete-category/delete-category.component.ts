import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrl: './delete-category.component.scss'
})
export class DeleteCategoryComponent {
  @Input() data: any;
  @Output() onReload = new EventEmitter<any>();
  constructor(
    private categoryService: CategoryService,
    private notification: NzNotificationService
  ) { }
  confirm(id: number): void {
    this.categoryService.delete(id).subscribe(
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
