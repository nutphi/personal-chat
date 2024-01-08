import { Component, DestroyRef, ElementRef, QueryList, ViewChildren, inject } from '@angular/core';
import { ChatService } from './services/chat.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { filter, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService } from './services/theme.service';
import { DatePipe, NgIf } from '@angular/common';
import { ENVIRONMENT } from './environment.token';

@Component({
  selector: 'nuttakit-chat',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, NgIf],
  template: `
  <div class="chat" [class.darkmode]="theme.darkmode()">
    <h3>Chat here to know Nuttakit more</h3>
    <div class="chat-content">
      <form [formGroup]="group" (ngSubmit)="sendMessage()">
        <button type="button" (click)="theme.toggle()">
            <img *ngIf="environment.chatImages; else defaultDarkMode" [src]="theme.darkmode() ? chatImg['light-mode'] : chatImg['dark-mode']">
            <ng-template #defaultDarkMode>
              <span class="img" [class.darkmode]="theme.darkmode()">
                {{ theme.darkmode() ? chatImg['light-mode'] : chatImg['dark-mode'] }}
              </span>
            </ng-template>
        </button>
        <input type="text" formControlName="message">
        <button type="submit">
            <img *ngIf="environment.chatImages; else defaultChatImg" [src]="chatImg.send">
            <ng-template #defaultChatImg>
              <span class="img">{{chatImg.send}}</span>
            </ng-template>
          </button>
      </form>
      <hr>
      <div class="message-section">
        @for (message of chat.allMessages(); track message.timestamp) {
          <div #messages class="message">
            <div class="{{message.type}}">
              <span class="time">{{ message.timestamp | date: 'shortTime' }}</span>
              <span class="text">
                <pre>{{ message.text }}</pre>
              </span>
              <div class="profile-section">
                @if(environment.profileImages) {
                  <img class="profile-img" [src]="profileImg[message.type]">
                } @else {
                  <span class="profile-img">{{profileImg[message.type]}}</span>
                }
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  </div>`,
  styleUrl: 'chat.component.scss'
})
export class ChatComponent {
  destroyRef = inject(DestroyRef);
  fb = inject(FormBuilder);
  environment = inject(ENVIRONMENT);
  profileImg = this.environment.profileImages ?? {
    received: '🤖',
    sending: '🏃',
    sent: '👶🏼'
  };
  chatImg = this.environment.chatImages ?? {
    "dark-mode": '🌙',
    "light-mode": '☀️',
    send: '✉️'
  };
  @ViewChildren('messages', {read: ElementRef<HTMLDivElement>}) messages!: QueryList<ElementRef<HTMLDivElement>>;

  constructor(protected chat: ChatService, protected theme: ThemeService) { }

  ngOnInit() {
    // set here to get default from localstorage
    this.theme.initialTheme();
  }

  ngAfterViewInit() {
    this.messages.changes.pipe(
      filter(list => !!(list?.last?.nativeElement)),
      map(list => list?.last?.nativeElement),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((value) => {
        value.scrollIntoView();
    });
  }

  group: FormGroup = this.fb.group({
    message: ['', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z0-9]).+$/)]]
  });

  sendMessage() {
    const message = this.group.getRawValue().message;
    if (this.group.valid) {
      this.chat.sendMessage(message);
      this.group.reset();
    }
  }
}
