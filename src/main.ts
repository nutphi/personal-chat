import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { CommonModule } from '@angular/common';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { ENVIRONMENT } from '@nuttakit/chat/src/lib/environment.token';
import { environment } from './environments/environment';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, CommonModule, AppRoutingModule, ReactiveFormsModule),
        provideHttpClient(withInterceptorsFromDi()),
        { provide: ENVIRONMENT, useValue: environment }
    ]
})
  .catch(err => console.error(err));
