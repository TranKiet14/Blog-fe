import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PostService } from '../../../../services/post.service';
import { CategoryService } from '../../../../services/category.service';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  createForm!: FormGroup;
  spinning: boolean = false
  srcImagePreview = '';
  categories: any;
  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private categoryService: CategoryService,
    private languageService: LanguageService,
    private notification: NzNotificationService
  ) { }
  ngOnInit(): void {
    this.categoryService.getList().subscribe(res => {
      this.categories = res.data
    })
    this.createForm = this.fb.group({
      category_ids: [null, [Validators.required]],
      content_posts: this.fb.array([]),
      thumbnail: []
    });
    this.languageService.getList().subscribe(res => {
      const contentPostsArray = res.data.map((item: any) => this.createContentPost(item.title, item.id));
      this.createForm.setControl('content_posts', this.fb.array(contentPostsArray));
    })
  }

  get contentPosts(): FormArray {
    return this.createForm.get('content_posts') as FormArray;
  }

  createContentPost(language_title: string, language_id: number): FormGroup {
    return this.fb.group({
      language_title: [language_title],
      language_id: [language_id],
      title: [''],
      content: ['']
    });
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      this.spinning = true
      const formData = new FormData();
      if (this.createForm.value.thumbnail) formData.append('thumbnail', this.createForm.value.thumbnail)
      // Thêm content_posts
      this.createForm.value.content_posts.forEach((post: { language_id: any; title: any; content: any }, index: number) => {
        formData.append(`content_posts[${index}][language_id]`, post.language_id);
        formData.append(`content_posts[${index}][title]`, post.title);
        formData.append(`content_posts[${index}][content]`, post.content);
      });

      // Thêm category_ids
      if (this.createForm.value.category_ids) {
        this.createForm.value.category_ids.forEach((id: any, index: number) => {
          formData.append(`category_ids[${index}]`, id);
        });
      }

      this.postService.create(formData).subscribe({
        next: (data: any) => {
          this.srcImagePreview = ''
          this.createForm.reset()
          this.spinning = false
          this.notification.create(
            'success',
            'Create success!!!',
            ''
          );
        },
        error: (error) => {
          this.notification.create(
            'error',
            'Create error!!!',
            ''
          );
        }
      })
    } else {
      Object.values(this.createForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  onUploadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.srcImagePreview = URL.createObjectURL(file);
      this.createForm.patchValue({
        thumbnail: file
      });
    }
  }
}
