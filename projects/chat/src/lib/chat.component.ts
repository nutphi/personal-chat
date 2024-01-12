import { Component, DestroyRef, ElementRef, QueryList, ViewChildren, inject } from '@angular/core';
import { ChatService } from './services/chat.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { filter, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService } from './services/theme.service';
import { DatePipe } from '@angular/common';
import { ENVIRONMENT } from './environments/environment.token';
import { defaultChatImages, defaultProfileImages } from './environments/environment.default';
import { ChatImg, Environment, ProfileImg } from './environments/environment.model';

@Component({
  selector: 'nuttakit-chat',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  template: `
  <div class="chat" [class.darkmode]="theme.darkmode()">
    <h3>Chat here to know Nuttakit more</h3>
    <div class="chat-content">
      <form [formGroup]="group" (ngSubmit)="sendMessage()">
        <button type="button" (click)="theme.toggle()">
          <img [src]="theme.darkmode() ? chatImg['light-mode'] : chatImg['dark-mode']">
        </button>
        <input type="text" formControlName="message">
        <button type="submit">
          <img [src]="chatImg.send">
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
                <img class="profile-img" [src]="profileImg[message.type]">
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
  destroyRef: DestroyRef = inject(DestroyRef);
  fb: FormBuilder = inject(FormBuilder);
  environment: Environment = inject(ENVIRONMENT);
  profileImg: ProfileImg = {
    ... defaultProfileImages,
    ... this.environment.profileImages
  };
  chatImg: ChatImg = {
    ... defaultChatImages,
    ... this.environment.chatImages
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
