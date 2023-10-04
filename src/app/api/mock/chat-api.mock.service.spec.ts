import { TestBed } from '@angular/core/testing';

import { ChatApiMockService } from './chat-api.mock.service';

describe('ChatApiMockService', () => {
  let service: ChatApiMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatApiMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
