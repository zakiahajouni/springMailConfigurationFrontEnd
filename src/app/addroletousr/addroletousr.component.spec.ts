import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddroletousrComponent } from './addroletousr.component';

describe('AddroletousrComponent', () => {
  let component: AddroletousrComponent;
  let fixture: ComponentFixture<AddroletousrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddroletousrComponent]
    });
    fixture = TestBed.createComponent(AddroletousrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
