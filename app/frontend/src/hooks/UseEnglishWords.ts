
import { useFetchAPI } from './UseFetchAPI';
import axios from '../../../../node_modules/axios/index';

export const useEnglishWords = () => {
    const { fetchAPI } = useFetchAPI();

    const fetchEnglishWords = async () => {
        const result: Object[] = await fetchAPI('http://localhost:53000/english_words/all');
        return result;
    }

    const createEnglishWords = async (englishWords: string[]) => {
        axios.post('http://localhost:53000/english_words', {
            words: englishWords
        })
            .then((response) => {
                console.log(response);
            });
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

        return result.data;
    }


    return { fetchEnglishWords, createEnglishWords, searchEnglishWords }
}