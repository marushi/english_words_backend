
import { useFetchAPI } from './UseFetchAPI';
import axios from '../../../../node_modules/axios/index';

export const useEnglishWords = () => {
    const { fetchAPI } = useFetchAPI();

    const fetchEnglishWords = async () => {
        const result: Object[] = await fetchAPI('http://localhost:53000/english_words/all');
        return result;
    }

    const createEnglishWord = async (englishWord: string) => {
        axios.post('http://localhost:53000/english_words', {
            word: englishWord
        })
            .then((response) => {
                console.log(response);
            });
    }


    return { fetchEnglishWords, createEnglishWord }
}