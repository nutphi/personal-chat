import { Component, effect } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RobotIconComponent } from '../robot-icon/robot-icon.component';
import { ChatComponent } from '@nuttakit/chat';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-personal-chat',
  standalone: true,
  imports: [ChatComponent, RobotIconComponent, ReactiveFormsModule],
  templateUrl: './personal-chat.component.html',
  styleUrl: './personal-chat.component.scss'
})
export class PersonalChatComponent {
  hidden = false;
  heightControl: FormControl = new FormControl(300);
  widthControl: FormControl = new FormControl(40);

  constructor() {
    const height = toSignal(this.heightControl.valueChanges);
    const width = toSignal(this.widthControl.valueChanges);

    effect(() => {
      localStorage.setItem('chatHeight', height());
      localStorage.setItem('chatWidth', width());
    });
  }

  ngOnInit() {
    let chatHeight = parseInt(localStorage.getItem('chatHeight') ?? "");
    let isNumber = !isNaN(chatHeight);
    if (isNumber) {
      this.heightControl.setValue(chatHeight);
    }

    let chatWidth = parseInt(localStorage.getItem('chatWidth') ?? "");
    isNumber = !isNaN(chatWidth);
    if (isNumber) {
      this.widthControl.setValue(chatWidth);
    }
  }
}
