import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../../../services/role.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.scss'
})
export class EditRoleComponent {
  @Input() data: any;
  @Output() onReload = new EventEmitter<any>();
  editForm!: FormGroup;
  isVisible = false;
  srcImagePreview = '';

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private notification: NzNotificationService
  ) { }
  ngOnInit(): void {
    this.editForm = this.fb.group({
      title: [this.data.title, [Validators.required]],
      description: [this.data.description]
    })
  }
  onSubmit(): void {
    if (this.editForm.valid) {
      this.roleService.edit(this.data.id, this.editForm.value).subscribe(
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
