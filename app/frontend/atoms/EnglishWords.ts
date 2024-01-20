import { atom, selector } from 'recoil';
import EnglishWord from '../models/EnglishWord';

export const englishWordsState = atom({
    key: 'englishWordsState',
    default: [] as EnglishWord[],
});

export const englishWordsPageState = atom({
    key: 'englishWordsPageState',
    default: 1,
});

export const englishWordsCountPerPageState = atom({
    key: 'englishWordsCountPerPageState',
    default: 10,
});

export const englishWordsPerPageState = selector({
    key: 'englishWordsPerPageState',
    get: ({ get }) => {
        const englishWords = get(englishWordsState);
        const englishWordsPage = get(englishWordsPageState);
        const englishWordsCountPerPage = get(englishWordsCountPerPageState);
        const startIndex = (englishWordsPage - 1) * englishWordsCountPerPage;
        const endIndex = startIndex + englishWordsCountPerPage;
        return englishWords.slice(startIndex, endIndex);
    }
});

export const englishWordsTitleListState = selector({
    key: 'englishWordsTitleListState',
    get: ({ get }) => {
        const englishWords = get(englishWordsState);
        return englishWords.map((englishWord) => englishWord.word);
    }
});

export const maxEnglishWordsPageState = selector({
    key: 'maxEnglishWordsPageState',
    get: ({ get }) => {
        const englishWords = get(englishWordsState);
        const englishWordsCountPerPage = get(englishWordsCountPerPageState);
        return Math.ceil(englishWords.length / englishWordsCountPerPage);
    }
});