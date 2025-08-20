import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MsalModule, MsalInterceptor, MsalService, MSAL_INSTANCE, MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG, MsalGuard, MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

import { MockBackendService } from './mock-backend.service';  // adjust path accordingly


const b2cPolicies = {
  names: {
    signUpSignIn: 'B2C_1_SignUpSignIn', // B2C user flow name
  },
  authorities: {
    signUpSignIn: {
      authority: 'https://BISCITdemo.b2clogin.com/BISCITdemo.onmicrosoft.com/B2C_1_SignUpSignIn',
    },
  },
  authorityDomain: 'biscitdemo.b2clogin.com',
};

export function MSALInstanceFactory(): PublicClientApplication { // the PublicClientApplication
// manages authentication with Azure AD B2C. 
//MSALInstanceFactory is a function that creates an instance of PublicClientApplication, which is part of the MSAL library.

  return new PublicClientApplication({
    auth: {
      clientId: '29500d06-594b-4053-a626-e17c094d20db', //from Azure AD B2C app registration
      authority: b2cPolicies.authorities.signUpSignIn.authority, //authority purpose is to specify the Azure AD B2C user flow or policy that the application will use for authentication.
      knownAuthorities: [b2cPolicies.authorityDomain], //purpose is to specify the domain of the Azure AD B2C tenant that the application will use for authentication.
      redirectUri: 'http://localhost:8100/', //my production URI
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: false, 
    },
  });
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['https://BISCITdemo.onmicrosoft.com/backend-api/access_backend'], // My scope from API permissions
    },
  };
}
//Back end Down here, test backend
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://localhost:7071/api/', ['https://BISCITdemo.onmicrosoft.com/backend-api/access_backend']);

  return {
    interactionType: InteractionType.Redirect, //redirect interaction type for the MSAL interceptor
    protectedResourceMap,
  };
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    MsalModule,
    AgGridModule,
    AppRoutingModule,
    HttpClientModule,

    // Mock backend data service for development/testing
    HttpClientInMemoryWebApiModule.forRoot(MockBackendService, { delay: 500 }),],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory },
    { provide: MSAL_GUARD_CONFIG, useFactory: MSALGuardConfigFactory },
    { provide: MSAL_INTERCEPTOR_CONFIG, useFactory: MSALInterceptorConfigFactory },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalService,
    MsalGuard
  ],
  bootstrap: [AppComponent] //bootstrap is for opening the appcomponent
})
export class AppModule {} 