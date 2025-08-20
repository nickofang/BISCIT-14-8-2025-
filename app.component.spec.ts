import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {

  beforeEach(async () => { //function that runs before each test
    await TestBed.configureTestingModule({ //jasmine testing framework awaits the testing module config
      declarations: [AppComponent],  //tells which components are part of this module
      schemas: [CUSTOM_ELEMENTS_SCHEMA], //no throwing error for custom elements
    }).compileComponents();
  });

  it('should create the app', () => { //test to check if the app component is created
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy(); //expect the app component to be truthy, meaning it exists
  });

});
