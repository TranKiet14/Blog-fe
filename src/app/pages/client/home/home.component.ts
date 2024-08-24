import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { formatDate } from '../../../helper/moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  listCategory: any;
  listPost: any;
  constructor (
    private postService: PostService,
  ){ }
  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.postService.getList().subscribe(res => {
      this.listPost = res.data.map((item: any) => ({
        id: item.id,
        thumbnail: item.thumbnail,
        createdAt: formatDate(item.createdAt),
        user: item.user,
        categories: item.categories,
        content_posts: item.content_posts,
      }))
    })
  }
}
