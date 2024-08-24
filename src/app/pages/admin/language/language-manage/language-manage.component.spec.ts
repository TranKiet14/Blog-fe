import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageManageComponent } from './language-manage.component';

describe('LanguageManageComponent', () => {
  let component: LanguageManageComponent;
  let fixture: ComponentFixture<LanguageManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanguageManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
