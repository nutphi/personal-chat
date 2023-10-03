import { Component, DestroyRef, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, inject } from '@angular/core';
import { ChatApiService } from './chat-api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'personal-chat';
  destroyRef = inject(DestroyRef);
  fb = inject(FormBuilder);
  profileImg = environment.profileImg;
  @ViewChildren('messages', {read: ElementRef<HTMLDivElement>}) messages!: QueryList<ElementRef<HTMLDivElement>>;

  constructor(protected chat: ChatApiService) { }

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
