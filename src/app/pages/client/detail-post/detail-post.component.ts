import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { formatDate } from '../../../helper/moment';
import { CommentService } from '../../../services/comment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrl: './detail-post.component.scss'
})
export class DetailPostComponent implements OnInit {
  dataCmt: any = [];
  data: any;
  user: any;
  createForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private notification: NzNotificationService
  ) { }
  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData !== null) {
      this.user = JSON.parse(userData);
    }
    this.route.params.subscribe(params => {
      if (params && params['slug']) this.postService.getDetail(params['slug']).subscribe(
        res => {
          res.data.createdAt = formatDate(res.data.createdAt)
          this.dataCmt = res.data.post.comments.map((item: any) => ({
            author: item.user.fullName,
            avatar: item.user.avatar,
            content: item.content,
            datetime: formatDate(item.createdAt)
          }))
          this.data = res.data
        }
      );
    });
    this.createForm = this.fb.group({
      content: [null, [Validators.required]]
    })
  }
  onSubmit(): void {
    if (this.createForm.valid) {
      this.createForm.value.post_id = this.data.id
      this.commentService.create(this.createForm.value).subscribe(
        res => {
          let user

          this.dataCmt = [
            ...this.dataCmt,
            {
              author: this.user.fullName,
              avatar: this.user.avatar,
              content: res.data.content,
              datetime: res.data.createdAt
            }
          ];
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
}
