import { Component, EventEmitter,  Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from '../../../../services/user.service';
import { RoleService } from '../../../../services/role.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  @Output() onReload = new EventEmitter<any>();
  createForm!: FormGroup;
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
    this.createForm = this.fb.group({
      fullName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null],
      role_id: [null, [Validators.required]],
      status: [null, [Validators.required]],
      avatar: []
    })
  }
  onSubmit(): void {
    if (this.createForm.valid) {
      const formData = new FormData();
      formData.append('fullName', this.createForm.value.fullName)
      formData.append('email', this.createForm.value.email)
      formData.append('password', this.createForm.value.password)
      formData.append('role_id', this.createForm.value.role_id)
      formData.append('status', this.createForm.value.status)
      if (this.createForm.value.avatar) formData.append('avatar', this.createForm.value.avatar)
      this.userService.create(formData).subscribe(
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

  onUploadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.srcImagePreview = URL.createObjectURL(file);
      this.createForm.patchValue({
        avatar: file
      });
      
    }
  }
}
