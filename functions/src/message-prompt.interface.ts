export interface IMessagePrompt {
  /** MessagePrompt context */
  context?: string|null;

  /** MessagePrompt examples */
  examples?: IExample[]|null;

  /** MessagePrompt messages */
  messages?: IMessage[]|null;
}

export interface IExample {
  /** Example input */
  input?: IMessage|null;

  /** Example output */
  output?: IMessage|null;
}

/**
 * Adds two numbers together.
 * @param {IMessagePrompt} i The first number.
 * @return {boolean} is the object IExample.
 */
export function isIExample(i: IExample): i is IExample {
  return !!(i as IExample).input?.content || !!(i as IExample).output?.content;
}

export interface IMessage {
  /** Message author */
  author?: string|null;

  /** Message content */
  content?: string|null;

  /** Message citationMetadata */
  citationMetadata?: ICitationMetadata|null;
}

/**
 * Adds two numbers together.
 * @param {IMessagePrompt} i The first number.
 * @return {boolean} is the object IExample.
 */
export function isIMessage(i: IMessage): i is IMessage {
  return !!(i as IMessage)?.content;
}

export interface ICitationMetadata {
  [key:string]: unknown;
}
