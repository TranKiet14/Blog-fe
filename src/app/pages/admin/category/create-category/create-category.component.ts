import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent {
  @Output() onReload = new EventEmitter<any>();
  createForm!: FormGroup;
  isVisible = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private notification: NzNotificationService
  ) { }
  ngOnInit(): void {
    this.createForm = this.fb.group({
      title: [null, [Validators.required]],
      status: [null, [Validators.required]],
      description: [null]
    })
  }
  onSubmit(): void {
    if (this.createForm.valid) {
      this.categoryService.create(this.createForm.value).subscribe(
        res => {
          this.onReload.emit(true);
          this.notification.create(
            'success',
            'Create success!!!',
            ''
          );
          this.isVisible = false;
        },
        error => {
          this.notification.create(
            'error',
            'Create error!!!',
            ''
          );
        }
      )
      
    } else {
      Object.values(this.createForm.controls).forEach(control => {
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
