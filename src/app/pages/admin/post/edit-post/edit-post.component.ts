import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PostService } from '../../../../services/post.service';
import { CategoryService } from '../../../../services/category.service';
import { LanguageService } from '../../../../services/language.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss'
})
export class EditPostComponent {
  data: any;
  editForm!: FormGroup;
  spinning: boolean = false
  srcImagePreview = '';
  categories: any;
  original_post_id: any;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private postService: PostService,
    private categoryService: CategoryService,
    private notification: NzNotificationService
  ) { }
  ngOnInit(): void {
    this.editForm = this.fb.group({
      category_ids: [null, [Validators.required]],
      content_posts: this.fb.array([]),
      thumbnail: []
    });
    this.route.params.subscribe(params => {
      if (params && params['id']) {
        this.original_post_id = params['id']
        this.postService.getDetailById(params['id']).subscribe(
          res => {
            this.editForm.patchValue({
              category_ids: res.data.categories.map((category: any) => category.id)
            });
            const contentPostsArray = res.data.content_posts.map((item: any) => this.createContentPost(item.id, item.language.title, item.language.id, item.title, item.content));
            this.editForm.setControl('content_posts', this.fb.array(contentPostsArray));
          }
        );
      }
    });
    this.categoryService.getList().subscribe(res => {
      this.categories = res.data
    })
  }

  get contentPosts(): FormArray {
    return this.editForm.get('content_posts') as FormArray;
  }

  createContentPost(id: number, language_title: string, language_id: number, title: string, content: string): FormGroup {
    return this.fb.group({
      id: [id],
      language_title: [language_title],
      language_id: [language_id],
      title: [title],
      content: [content]
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.spinning = true
      const formData = new FormData();
      if (this.editForm.value.thumbnail) formData.append('thumbnail', this.editForm.value.thumbnail)
      // Thêm content_posts
      this.editForm.value.content_posts.forEach((item: { id: any; title: any; content: any }, index: number) => {
        formData.append(`content_posts[${index}][id]`, item.id);
        formData.append(`content_posts[${index}][title]`, item.title);
        formData.append(`content_posts[${index}][content]`, item.content);
      });

      // Thêm category_ids
      if (this.editForm.value.category_ids) {
        this.editForm.value.category_ids.forEach((id: any, index: number) => {
          formData.append(`category_ids[${index}]`, id);
        });
      }

      this.postService.edit(this.original_post_id, formData).subscribe({
        next: (data: any) => {
          this.spinning = false
          this.notification.create(
            'success',
            'Update success!!!',
            ''
          );
        },
        error: (error) => {
          this.notification.create(
            'error',
            'Update error!!!',
            ''
          );
        }
      })
      // console.log(this.original_post_id, this.editForm.value)
    } else {
      Object.values(this.editForm.controls).forEach(control => {
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
      this.editForm.patchValue({
        thumbnail: file
      });
    }
  }
}
