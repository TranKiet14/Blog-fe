import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  listCategory: any;
  constructor (
    private categoryService: CategoryService,
  ){ }
  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.categoryService.getList().subscribe(res => {
      this.listCategory = res.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        posts: item.posts
      }))
    })
  }
}
