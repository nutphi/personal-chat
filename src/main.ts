import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { CommonModule } from '@angular/common';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { chatReducer } from './app/chat/store/chat.reducer';
import { themeReducer } from './app/theme/store/theme.reducer';
import { storageReducer } from './app/storage/store/storage.reducers';
import { ChatEffects } from './app/chat/store/chat.effects';
import { ThemeEffects } from './app/theme/store/theme.effects';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
            BrowserModule,
            CommonModule,
            AppRoutingModule,
            ReactiveFormsModule
        ),
        provideStore({
            chat: chatReducer,
            theme: themeReducer,
            storage: storageReducer
        }),
        provideEffects([ChatEffects, ThemeEffects]),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
