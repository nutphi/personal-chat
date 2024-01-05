import { Environment } from "projects/chat/src/lib/environment.model";

export const environment: Environment = {
  profileImages: {
    'received': 'assets/bot.png',
    'sending': 'assets/user.png',
    'sent': 'assets/user.png'
  },
  chatImages: {
    'dark-mode': 'assets/night-mode.png',
    'light-mode': 'assets/day-mode.png',
    'send': 'assets/send.png'
  },
  isMockup: false,
  apiUrl: 'https://us-east1-personal-chat-3eac2.cloudfunctions.net',
};
