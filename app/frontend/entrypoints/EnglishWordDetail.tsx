import '../src/index.css';
import { AppLayout } from '../components/AppLayout';
import React from 'react';
import { IconButton, Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import { englishWordsState, selectedEnglishWordState } from '../atoms/EnglishWords';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';

const toggleLabels = ["英語リスト", "英語検索"];

const EnglishWordDetail = () => {
    const [_, setEnglishWords] = useRecoilState(englishWordsState)
    const [selectedEnglishWord, setSelectedEnglishWord] = useRecoilState(selectedEnglishWordState)

    return (
        <React.StrictMode>
            <AppLayout
                header={header()}
                children={
                    <Typography variant="h6" sx={{ padding: "16px" }}>{selectedEnglishWord?.word}</Typography>
                }
            />
        </React.StrictMode >
    );
};

const header = () => {
    const navigate = useNavigate()

    return (
        <IconButton
            onClick={() => navigate(-1)}
        >
            <ChevronLeftIcon />
        </IconButton>
    )
}


export default EnglishWordDetail;