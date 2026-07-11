import { GAME_ERRORS } from "./errorMessages";

export const validateLocalGameRules = (word, wordsList) => {
  if (wordsList.includes(word)) {
    return GAME_ERRORS.alreadyUsed;
  }

  if (wordsList.length > 0) {
    const lastWord = wordsList[wordsList.length - 1];
    const lastLetter = lastWord.charAt(lastWord.length - 1);
    if (word.charAt(0) !== lastLetter) {
      return GAME_ERRORS.invalidChain;
    }
  }

  return null;
};