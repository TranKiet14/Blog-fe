import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrl: './detail-category.component.scss'
})
export class DetailCategoryComponent {
  listPost: any
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params && params['slug']) {
        this.categoryService.getDetailBySlug(params['slug']).subscribe(
          res => {
            this.listPost = res.data.posts
          }
        );
      }
    });
  }
}
