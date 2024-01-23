import '../src/index.css';
import { AppLayout } from '../components/AppLayout';
import React, { useEffect, useState } from 'react';
import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useEnglishWords } from '../hooks/UseEnglishWords';
import { SearchForm } from '../components/SearchForm';
import { EnglishWordsList } from '../components/EnglishWordsList';
import { searchEnglishWordsFlagState } from '../atoms/SearchEnglishWordsFlag';
import { RecoilRoot, useRecoilState } from 'recoil';
import { SearchCircularProgress } from '../components/SearchCircularProgress';
import { englishWordsState } from '../atoms/EnglishWords';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EnglishWordDetail from './EnglishWordDetail';
import { NotFoundPage } from './NotFoundPage';

const toggleLabels = ["英語リスト", "英語検索"];

const App = () => {
    const [_, setEnglishWords] = useRecoilState(englishWordsState)
    const [selectedToggle, setSelectedToggle] = useState<string>(toggleLabels[0]);
    const [searchResultEnglishWords, setSearchResultEnglishWords] = useState<Object[]>([]);
    const [searchEnglishWordsFlag] = useRecoilState(searchEnglishWordsFlagState)

    const { fetchEnglishWordList, searchEnglishWords } = useEnglishWords();
    useEffect(() => {
        fetchEnglishWordList(setEnglishWords);
    }, []);

    return (
        <React.StrictMode>
            <AppLayout
                header={header({ selectedToggle, setSelectedToggle })}
                children={
                    <>
                        {selectedToggle === toggleLabels[0]
                            ? (<EnglishWordsList />)
                            : (<SearchForm
                                searchEnglishWords={searchEnglishWords}
                                setSearchResultEnglishWords={setSearchResultEnglishWords}
                                searchResultEnglishWords={searchResultEnglishWords}
                            />)}
                        {
                            searchEnglishWordsFlag
                                ? <SearchCircularProgress />
                                : <></>
                        }</>
                }
            />
        </React.StrictMode >
    );
};

const header = ({ selectedToggle, setSelectedToggle }) => {
    return (
        <Box sx={{ padding: "0", margin: "0" }}>
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
        </Box>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <RecoilRoot>
        <BrowserRouter>
            <Routes>
                <Route path="/english_words" element={<App />} />
                <Route path="/english_words/:id" element={<EnglishWordDetail />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    </RecoilRoot>
);