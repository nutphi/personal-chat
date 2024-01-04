export type MessageType = 'received' | 'sending' | 'sent';
export type ProfileImg = Record<MessageType, string>;
export type Environment = {
  profileImg: ProfileImg,
  isMockup: boolean,
  apiUrl: string
};
