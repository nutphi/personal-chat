import { of } from "rxjs";

export const sampleMessages = [
  { "text": "Hi! How can I help you today?", "type": "received", "timestamp": 1696370310540 },
  { "text": "Tell me about Nuttakit", "type": "sent", "timestamp": 1696370318922 },
  { "text": "Nuttakit Phichitsakuldes is a software developer with over 5 years of comprehensive experience, specializing in Angular for frontend applications. Adept at collaborating in cross-functional teams and delivering high-quality software solutions.\n\nNuttakit is originally from Thailand, but he's currently living in QC, Canada. He enjoys playing ping-pong, traveling, and eating.\n\nNuttakit is a hard worker and is always looking for ways to improve his skills. He is also a team player and is always willing to help others.\n\nNuttakit is a valuable asset to any team and would be a great addition to any company.", "type": "received", "timestamp": 1696370330220 }
];

// randomly get text by message type
export const getASampleText$ = (type: 'received' | 'sent' | 'sending' | undefined) => {
  const sampleMessagesByType = sampleMessages.filter((m) => !type || m.type === type);
  const random = Math.floor(Math.random() * sampleMessagesByType.length);
  return of(sampleMessagesByType[random].text);
};

export const sampleMessages$ = of(sampleMessages);
