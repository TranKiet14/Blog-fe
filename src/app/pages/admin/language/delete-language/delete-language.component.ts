import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-delete-language',
  templateUrl: './delete-language.component.html',
  styleUrl: './delete-language.component.scss'
})
export class DeleteLanguageComponent {
  @Input() data: any;
  @Output() onReload = new EventEmitter<any>();
  constructor(
    private languageService: LanguageService,
    private notification: NzNotificationService
  ) { }
  confirm(id: number): void {
    this.languageService.delete(id).subscribe(
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
