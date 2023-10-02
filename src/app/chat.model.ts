export interface Message {
  text: string;
  type: MessageType;
}

export type MessageType = 'sending' | 'sent' | 'received';
