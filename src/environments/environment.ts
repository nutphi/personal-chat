import { Environment } from "@nuttakit/chat/src/lib/environments/environment.model";

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
  apiUrl: 'https://chatbot-5qa4pswpya-ue.a.run.app',
};
