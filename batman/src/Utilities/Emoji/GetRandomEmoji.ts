import { EmojiArray } from './EmojiArray';
import { Randomify } from '../Random';

export const getRandomEmoji = (): string => {
  const randomNumber = Randomify(0, EmojiArray.length);
  return EmojiArray[randomNumber];
};
