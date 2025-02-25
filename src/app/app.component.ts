import { Component } from '@angular/core';
import { PersonalChatComponent } from './personal-chat/personal-chat.component';

@Component({
    selector: 'app-root',
    template: `
      <app-personal-chat></app-personal-chat>
    `,
    styles: ``,
    imports: [PersonalChatComponent]
})
export class AppComponent {
  title = 'personal-chat';
}
