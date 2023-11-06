import { Component, DestroyRef, ElementRef, QueryList, ViewChildren, inject } from '@angular/core';
import { ChatService } from './chat/chat.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { filter, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from './../environments/environment';
import { ThemeService } from './theme/theme.service';
import { NgFor, DatePipe, AsyncPipe, NgIf, JsonPipe } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, NgIf, NgFor, DatePipe, AsyncPipe, JsonPipe]
})
export class AppComponent {
  title = 'personal-chat';
  destroyRef = inject(DestroyRef);
  fb = inject(FormBuilder);
  profileImg = environment.profileImg;
  @ViewChildren('messages', {read: ElementRef<HTMLDivElement>}) messages!: QueryList<ElementRef<HTMLDivElement>>;

  constructor(protected chat: ChatService, protected theme: ThemeService) { }

  ngOnInit() {
    // set here to get default from localstorage
    this.chat.sendDefaultMessage();
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
    message: ''
  });

  sendMessage() {
    this.chat.sendMessage(this.group.getRawValue().message);
    this.group.reset();
  }
}
