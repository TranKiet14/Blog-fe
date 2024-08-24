import { Component, EventEmitter,  Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-create-language',
  templateUrl: './create-language.component.html',
  styleUrl: './create-language.component.scss'
})
export class CreateLanguageComponent {
  @Output() onReload = new EventEmitter<any>();
  createForm!: FormGroup;
  isVisible = false;
  srcImagePreview = '';

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService,
    private notification: NzNotificationService
  ) { }
  ngOnInit(): void {
    this.createForm = this.fb.group({
      title: [null, [Validators.required]],
      language_code: [null, [Validators.required]],
      flag: []
    })
  }
  onSubmit(): void {
    if (this.createForm.valid) {
      const formData = new FormData();
      formData.append('title', this.createForm.value.title)
      formData.append('language_code', this.createForm.value.language_code)
      if (this.createForm.value.flag) formData.append('flag', this.createForm.value.flag)
      this.languageService.create(formData).subscribe(
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
        flag: file
      });
      
    }
  }
}
