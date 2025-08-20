import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(() => { //beforeEach block to set up the testing module
    fixture = TestBed.createComponent(LoginPage); // Create the component instance
    component = fixture.componentInstance; // Get the component instance and store it in component variable
    fixture.detectChanges(); // Trigger change detection to apply the initial data binding
  });

  it('should create', () => { // Test to check if the component is created successfully
    expect(component).toBeTruthy();
  });
});
