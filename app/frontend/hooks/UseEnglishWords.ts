
import { useFetchAPI } from './UseFetchAPI';
import axios from '../../../node_modules/axios/index';
import EnglishWord from '../models/EnglishWord';

export const useEnglishWords = () => {
    const { fetchAPI } = useFetchAPI();

    const fetchEnglishWords = async (setEnglishWords: (englishWords: EnglishWord[]) => void) => {
        const result: Object[] = await fetchAPI('http://localhost:53000/english_words/all');
        const englishWords: EnglishWord[] = result.map((result) => {
            return EnglishWord.fromJson(result);
        });
        setEnglishWords(englishWords);
    }

    const createEnglishWords = async (englishWords: Object[], setEnglishWords: (englishWords: EnglishWord[]) => void) => {
        const result = await axios.post('http://localhost:53000/english_words', {
            english_words: englishWords
        });
        if (result.status === 200) {
            fetchEnglishWords(setEnglishWords);
        }
    }

    const deleteEnglishWords = async (englishWords: EnglishWord[], setEnglishWords: (englishWords: EnglishWord[]) => void) => {
        const result = await axios.delete('http://localhost:53000/english_words/destroy', {
            data: {
                english_words: englishWords.map((englishWord) => { return { id: englishWord.id } })
            }
        });
        if (result.status === 200) {
            fetchEnglishWords(setEnglishWords);
        }
    }

    const searchEnglishWords = async (
        keyword: string,
        situation: string,
        style: string,
        difficulty: string,
    ) => {
        const result = await axios.post('http://localhost:53000/search_english',
            {
                "keyword": keyword,
                "situation": situation,
                "style": style,
                "difficulty": difficulty,
                "type": "単語"
            })

        console.log("this is result data")
        console.log(result.data)

        return result.data;
    }


    return { fetchEnglishWords, createEnglishWords, searchEnglishWords, deleteEnglishWords };
}