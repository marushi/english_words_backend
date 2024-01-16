import '../src/index.css';
import { AppLayout } from '../components/AppLayout';
import React, { useEffect, useState } from 'react';
import EnglishWord from '../models/EnglishWord';
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useEnglishWords } from '../hooks/UseEnglishWords';
import { SearchForm } from '../components/SearchForm';
import ReactDOM from 'react-dom';
import { EnglishWordsList } from '../components/EnglishWordsList';
import { searchEnglishWordsFlagState } from '../atoms/SearchEnglishWordsFlag';
import { RecoilRoot, useRecoilState } from 'recoil';
import { SearchCircularProgress } from '../components/SearchCircularProgress';

const toggleLabels = ["英語リスト", "英語検索"];

const App = () => {
    const [englishWords, setEnglishWords] = useState<EnglishWord[]>([]);
    const [selectedToggle, setSelectedToggle] = useState<string>(toggleLabels[0]);
    const [searchResultEnglishWords, setSearchResultEnglishWords] = useState<string[]>([]);
    const [checkedResultEnglishWords, setCheckedResultEnglishWords] = useState<string[]>([]);
    const [searchEnglishWordsFlag, setSearchEnglishWordsFlag] = useRecoilState(searchEnglishWordsFlagState)

    const { fetchEnglishWords, searchEnglishWords, createEnglishWords } = useEnglishWords();
    useEffect(() => {
        fetchEnglishWords().then((results) => {
            const englishWords: EnglishWord[] = results.map((result) => {
                return EnglishWord.fromJson(result);
            });
            setEnglishWords(englishWords);
        });
    }, []);

    return (
        <React.StrictMode>
            <AppLayout>
                <ToggleButtonGroup
                    color="primary"
                    value={selectedToggle}
                    exclusive
                >
                    {toggleLabels.map((toggleLabel) => {
                        return <ToggleButton value={toggleLabel} aria-label={toggleLabel} onClick={() => setSelectedToggle(toggleLabel)} sx={{ paddingX: "16px", paddingY: "8px" }}>
                            <Typography variant="button" >{toggleLabel}</Typography>
                        </ToggleButton>
                    })}
                </ToggleButtonGroup>
                {selectedToggle === toggleLabels[0]
                    ? (<EnglishWordsList englishWords={englishWords} />)
                    : (<SearchForm
                        searchEnglishWords={searchEnglishWords}
                        setSearchResultEnglishWords={setSearchResultEnglishWords}
                        searchResultEnglishWords={searchResultEnglishWords}
                        checkedResultEnglishWords={checkedResultEnglishWords}
                        setCheckedResultEnglishWords={setCheckedResultEnglishWords}
                        createEnglishWords={createEnglishWords} />)}
                {
                    searchEnglishWordsFlag
                        ? <SearchCircularProgress />
                        : <></>
                }
            </AppLayout>
        </React.StrictMode >
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RecoilRoot>
        <App />
    </RecoilRoot>
);