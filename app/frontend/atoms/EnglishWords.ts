import { atom, selector } from 'recoil';
import EnglishWord from '../models/EnglishWord';

export const englishWordsState = atom({
    key: 'englishWordsState',
    default: [] as EnglishWord[],
});

export const englishWordsTitleListState = selector({
    key: 'englishWordsTitleListState',
    get: ({ get }) => {
        const englishWords = get(englishWordsState);
        return englishWords.map((englishWord) => englishWord.word);
    }
});