import { Component } from '@angular/core';
import { ChatComponent } from 'projects/chat/src/public-api';

@Component({
  selector: 'app-root',
  template: `<nuttakit-chat></nuttakit-chat>`,
  styles: ``,
  standalone: true,
  imports: [ChatComponent]
})
export class AppComponent {
  title = 'personal-chat';
}
