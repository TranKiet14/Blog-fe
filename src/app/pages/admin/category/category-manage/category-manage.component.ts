import { Component } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { formatDate } from '../../../../helper/moment';

@Component({
  selector: 'app-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrl: './category-manage.component.scss'
})
export class CategoryManageComponent {
  listOfData: any;

  constructor(
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.categoryService.getList().subscribe(res => {
      this.listOfData = res.data.map((item: any) => ({
        id: item.id,
        title: item.title,
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
