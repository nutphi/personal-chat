import { ApplicationRef, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { CommonModule } from '@angular/common';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { ENVIRONMENT } from '@nuttakit/chat';
import { environment } from './environments/environment';
import { createCustomElement } from '@angular/elements';
import { PersonalChatComponent } from './app/personal-chat/personal-chat.component';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, CommonModule, AppRoutingModule, ReactiveFormsModule),
        provideHttpClient(withInterceptorsFromDi()),
        { provide: ENVIRONMENT, useValue: environment }
    ]
})
  .then((value: ApplicationRef) => {
    const injector = value.injector;
    const element = createCustomElement(PersonalChatComponent, { injector });
    customElements.define('app-personal-chat', element);
  })
  .catch((err) => console.error(err));
