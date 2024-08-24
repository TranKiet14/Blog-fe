import { Component } from '@angular/core';
import { LanguageService } from '../../../../services/language.service';
import { formatDate } from '../../../../helper/moment';
@Component({
  selector: 'app-language-manage',
  templateUrl: './language-manage.component.html',
  styleUrl: './language-manage.component.scss'
})
export class LanguageManageComponent {
  listOfData: any;
  constructor(
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.languageService.getList().subscribe(res => {
      this.listOfData = res.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        flag: item.flag,
        language_code: item.language_code,
        createdAt: formatDate(item.createdAt),
        updatedAt: formatDate(item.updatedAt)
      }))
    })
  }
  
  handleReload(newValue: boolean) {
    if (newValue) this.getData()
  }
}
