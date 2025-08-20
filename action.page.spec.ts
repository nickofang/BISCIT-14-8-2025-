import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionPage } from './action.page';

describe('ActionPage', () => {
  let component: ActionPage;
  let fixture: ComponentFixture<ActionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { //it
    expect(component).toBeTruthy();
  });
});

//could be written as this.
//function shouldCreateComponent() {expect(component).toBeTruthy();}
// it('should create', shouldCreateComponent);
