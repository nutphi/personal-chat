import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, input, InputSignal, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-robot-icon',
  standalone: true,
  templateUrl: './robot-icon.component.html',
  styleUrl: './robot-icon.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class RobotIconComponent {
  icon: InputSignal<boolean> = input<boolean>(false);
}
