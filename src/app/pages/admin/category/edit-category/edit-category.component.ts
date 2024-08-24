import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss'
})
export class EditCategoryComponent {
  @Input() data: any;
  @Output() onReload = new EventEmitter<any>();
  editForm!: FormGroup;
  isVisible = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private notification: NzNotificationService
  ) { }
  ngOnInit(): void {
    this.editForm = this.fb.group({
      title: [this.data.title, [Validators.required]],
      status: [this.data.status, [Validators.required]],
      description: [this.data.description]
    })
  }
  onSubmit(): void {
    if (this.editForm.valid) {
      this.categoryService.edit(this.data.id, this.editForm.value).subscribe(
        res => {
          this.onReload.emit(true);
          this.notification.create(
            'success',
            'Update success!!!',
            ''
          );
          this.isVisible = false;
        },
        error => {
          this.notification.create(
            'error',
            'Update error!!!',
            ''
          );
        }
      )
      
    } else {
      Object.values(this.editForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.onSubmit()
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
