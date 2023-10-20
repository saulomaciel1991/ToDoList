import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovoPage } from './novo.page';

describe('NovoPage', () => {
  let component: NovoPage;
  let fixture: ComponentFixture<NovoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NovoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
