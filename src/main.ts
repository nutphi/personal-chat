import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { CommonModule } from '@angular/common';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { chatReducer } from './app/chat/store/chat.reducer';
import { themeReducer } from './app/theme/store/theme.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ChatEffects } from './app/chat/store/chat.effects';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
            BrowserModule,
            CommonModule,
            AppRoutingModule,
            ReactiveFormsModule,
            StoreModule.forRoot({
                chat: chatReducer,
                theme: themeReducer
            }),
            EffectsModule.forRoot([ChatEffects])
        ),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
