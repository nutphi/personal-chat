import { Component } from '@angular/core';
import { ChatComponent } from '@nuttakit/chat';

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
