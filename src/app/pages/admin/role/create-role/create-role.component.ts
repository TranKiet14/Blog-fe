import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../../../services/role.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.scss'
})
export class CreateRoleComponent {

  @Output() onReload = new EventEmitter<any>();
  createForm!: FormGroup;
  isVisible = false;
  srcImagePreview = '';
  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private notification: NzNotificationService
  ) { }
  ngOnInit(): void {
    this.createForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null]
    })
  }
  onSubmit(): void {
    if (this.createForm.valid) {
      this.roleService.create(this.createForm.value).subscribe(
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
      // console.log(this.createForm.value)
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
