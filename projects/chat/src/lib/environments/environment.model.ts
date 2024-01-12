export type MessageType = 'received' | 'sending' | 'sent';
export type ChatImgType = 'send' | 'dark-mode' | 'light-mode';
export type ProfileImg = Record<MessageType, string>;
export type ChatImg = Record<ChatImgType, string>;
export type Environment = {
  profileImages: ProfileImg,
  chatImages: ChatImg,
  isMockup: boolean,
  apiUrl: string
};
