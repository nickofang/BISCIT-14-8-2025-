import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { AuthenticationResult } from '@azure/msal-browser'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})

export class LoginPage implements OnInit {

  constructor(private msalService: MsalService, private router: Router) {}
  //msalService is injected to handle authentication operations
  //router is injected to navigate to different pages after login
  //constructor is used to initialize the component and inject dependencies

  ngOnInit(): void {
    // initialize MSAL instance
    // ensuring that the MSAL instance is ready before any authentication operations
    //then/catch is used to handle the promise. same concept as if else statement
    this.msalService.instance
      .initialize()
      .then(() => {
        console.log('MSAL instance initialized');
      })
      .catch((error) => {
        console.error('MSAL initialization failed', error);
      });
  }

  login() {
    console.log('Login button clicked');//error handling purpose, check inspect elements.


    // Ensure MSAL is initialized
    if (this.msalService.instance) {
      console.log('MSAL initialized successfully'); // for console purpose
      
      // Proceed with login using popup flow
      this.msalService.loginPopup()
        .subscribe({ // Subscribe to the observable that has the login result. Asynchronous operation without blocking the UI.
          next: (response: AuthenticationResult) => { //like if else statement
            console.log('Login successful', response);
            this.handleLoginSuccess(response);
          },
          error: (error) => {
            console.log('Login failed', error);
          }
        });
    } else {
      console.error('MSAL is not initialized.');
    }
  }


  handleLoginSuccess(response: AuthenticationResult) {
    console.log('Handling login success...');

    // Save the user's display name from ID token
    const userName = (response.idTokenClaims as any)?.['name'];
    if (userName) {
      localStorage.setItem('userName', userName); // temporarily save in browser storage
      console.log('Logged in as:', userName);
    } else {
      console.warn('No display name found in token');
    }

    // Navigate to action page after login
    this.router.navigate(['/action']);  
  }
}