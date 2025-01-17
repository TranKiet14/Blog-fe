import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDemoComponent } from './upload-demo.component';

describe('UploadDemoComponent', () => {
  let component: UploadDemoComponent;
  let fixture: ComponentFixture<UploadDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
