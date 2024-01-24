import '../src/index.css';
import { AppLayout } from '../components/AppLayout';
import React, { useEffect } from 'react';
import { Box, Container, Divider, IconButton, Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import { englishWordsState, selectedEnglishWordState } from '../atoms/EnglishWords';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';
import { Gap } from '../components/Gap';

const EnglishWordDetail = () => {
    const navigate = useNavigate()

    const [_, setEnglishWords] = useRecoilState(englishWordsState)
    const [selectedEnglishWord] = useRecoilState(selectedEnglishWordState)

    console.log(selectedEnglishWord)

    useEffect(() => {
        if (selectedEnglishWord === undefined) {
            navigate(-1)
        }
    }, [])

    return (
        <React.StrictMode>
            <AppLayout
                header={header({ navigate, selectedEnglishWord })}
                children={
                    <Container
                        sx={{ width: '100%', alignItems: 'center', paddingY: '24px' }}>
                        <Typography variant="h5" sx={{ flexGrow: '1', textAlign: 'center', textWeight: "bold" }}>{selectedEnglishWord?.word}</Typography>
                        <Typography sx={{ flexGrow: '1', textAlign: 'center' }}>{selectedEnglishWord?.phonetic_symbol}</Typography>
                        <Typography sx={{ flexGrow: '1', textAlign: 'center' }}>{selectedEnglishWord?.word_japanese}</Typography>
                        <Divider sx={{ margin: '24px' }} />
                        <Typography sx={{ flexGrow: '1', textAlign: 'center' }}>{selectedEnglishWord?.example_sentence["sentence_1"]}</Typography>
                        <Gap size={16} />
                        <Typography sx={{ flexGrow: '1', textAlign: 'center' }}>{selectedEnglishWord?.example_sentence["sentence_japanese_1"]}</Typography>
                        <Divider sx={{ margin: '24px' }} />
                        <Typography sx={{ flexGrow: '1', textAlign: 'center' }}>{selectedEnglishWord?.example_sentence["sentence_2"]}</Typography>
                        <Gap size={16} />
                        <Typography sx={{ flexGrow: '1', textAlign: 'center' }}>{selectedEnglishWord?.example_sentence["sentence_japanese_2"]}</Typography>
                        <Divider sx={{ margin: '24px' }} />
                        <Typography sx={{ flexGrow: '1', textAlign: 'center' }}>{selectedEnglishWord?.example_sentence["sentence_3"]}</Typography>
                        <Gap size={16} />
                        <Typography sx={{ flexGrow: '1', textAlign: 'center' }}>{selectedEnglishWord?.example_sentence["sentence_japanese_3"]}</Typography>
                        <Divider sx={{ margin: '24px' }} />
                        <Box
                            margin="16px"
                            padding="16px"
                            sx={{
                                backgroundColor: '#f0f0f0',
                                borderRadius: '8px',
                            }}
                        >
                            <Typography sx={{ flexGrow: '1', textAlign: 'center' }}>{selectedEnglishWord?.description_and_origin}</Typography>
                        </Box>
                        <Divider sx={{ margin: '24px' }} />
                        <Typography sx={{ flexGrow: '1', textAlign: 'center' }}>{selectedEnglishWord?.synonym}</Typography>
                        <Typography sx={{ flexGrow: '1', textAlign: 'center' }}>{selectedEnglishWord?.synonym_japanese}</Typography>
                    </Container>
                }
            />
        </React.StrictMode >
    );
};

const header = ({ navigate, selectedEnglishWord }) => {

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => navigate(-1)}>
                <ChevronLeftIcon />
            </IconButton>
            <Typography sx={{ textAlign: 'center', padding: '16px' }}>
                {selectedEnglishWord?.word}
            </Typography>
        </Box>
    )
}


export default EnglishWordDetail;