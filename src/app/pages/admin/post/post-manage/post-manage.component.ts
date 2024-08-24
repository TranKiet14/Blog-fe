import { Component } from '@angular/core';
import { formatDate } from '../../../../helper/moment';
import { PostService } from '../../../../services/post.service';

@Component({
  selector: 'app-post-manage',
  templateUrl: './post-manage.component.html',
  styleUrl: './post-manage.component.scss'
})
export class PostManageComponent {
  listOfData: any;

  constructor(
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.postService.getList().subscribe(res => {
      this.listOfData = res.data.map((item: any) => ({
        id: item.id,
        title: item?.content_posts[0]?.title,
        content_posts: item.content_posts,
        categories: item.categories,
        thumbnail: item.thumbnail,
        status: item.status,
        description: item.description,
        createdAt: formatDate(item.createdAt),
        updatedAt: formatDate(item.updatedAt)
      }))
    })
    
  }

  handleReload(newValue: boolean) {
    if (newValue) this.getData()
  }
}
