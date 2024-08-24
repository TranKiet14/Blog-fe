import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-edit-language',
  templateUrl: './edit-language.component.html',
  styleUrl: './edit-language.component.scss'
})
export class EditLanguageComponent {
  @Input() data: any;
  @Output() onReload = new EventEmitter<any>();
  editForm!: FormGroup;
  isVisible = false;
  srcImagePreview = '';

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService,
    private notification: NzNotificationService
  ) { }
  ngOnInit(): void {
    this.editForm = this.fb.group({
      title: [this.data.title, [Validators.required]],
      language_code: [this.data.language_code, [Validators.required]],
      flag: []
    })
    this.srcImagePreview = this.data.flag
  }
  onSubmit(): void {
    if (this.editForm.valid) {
      const formData = new FormData();
      formData.append('title', this.editForm.value.title)
      formData.append('language_code', this.editForm.value.language_code)
      formData.append('flag', this.editForm.value.flag)
      this.languageService.edit(this.data.id, formData).subscribe(
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
        flag: file
      });
      
    }
  }
}
