import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionEditDeleteComponent } from './transaction-edit-delete.component';

describe('TransactionEditDeleteComponent', () => {
  let component: TransactionEditDeleteComponent;
  let fixture: ComponentFixture<TransactionEditDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionEditDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionEditDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
