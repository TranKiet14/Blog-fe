import { Component } from '@angular/core';

import { NzUploadFile } from 'ng-zorro-antd/upload';


@Component({
  selector: 'app-upload-demo',
  templateUrl: './upload-demo.component.html',
  styleUrl: './upload-demo.component.scss'
})
export class UploadDemoComponent {
  
  fileList: NzUploadFile[] = []; 

  handleChange(event: any): void {
    this.fileList = event.fileList.slice(-1);
  }
}
