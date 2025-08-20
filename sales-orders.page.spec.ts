import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesOrdersPage } from './sales-orders.page';

describe('SalesOrdersPage', () => {
  let component: SalesOrdersPage;
  let fixture: ComponentFixture<SalesOrdersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
