export interface ChatState {
    messages: Message[]
}

export interface Message {
    text: string;
    type: MessageType;
    timestamp: number;
}

export type MessageType = 'sending' | 'sent' | 'received';
