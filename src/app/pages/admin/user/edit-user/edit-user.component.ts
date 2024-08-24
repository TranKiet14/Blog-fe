import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from '../../../../services/user.service';
import { RoleService } from '../../../../services/role.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
  @Input() data: any;
  @Output() onReload = new EventEmitter<any>();
  editForm!: FormGroup;
  isVisible = false;
  srcImagePreview = '';
  roles: any

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private notification: NzNotificationService
  ) { }
  ngOnInit(): void {
    this.roleService.getList().subscribe(res => {
      this.roles = res.data.map((item: any) => ({
        id: item.id,
        title: item.title
      }))
    })
    this.editForm = this.fb.group({
      fullName: [this.data.fullName, [Validators.required]],
      email: [this.data.email, [Validators.required]],
      password: [this.data.password],
      role_id: [this.data.role.id ? this.data.role.id.toString() : '', [Validators.required]],
      status: [this.data.status, [Validators.required]],
      avatar: []
    })
    this.srcImagePreview = this.data.avatar
  }
  onSubmit(): void {
    if (this.editForm.valid) {
      const formData = new FormData();
      formData.append('fullName', this.editForm.value.fullName)
      formData.append('email', this.editForm.value.email)
      if (this.editForm.value.password) formData.append('password', this.editForm.value.password)
      formData.append('role_id', this.editForm.value.role_id)
      formData.append('status', this.editForm.value.status)
      if (this.editForm.value.avatar) formData.append('avatar', this.editForm.value.avatar)
      this.userService.edit(this.data.id, formData).subscribe(
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

  onUploadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.srcImagePreview = URL.createObjectURL(file);
      this.editForm.patchValue({
        avatar: file
      });

    }
  }
}
