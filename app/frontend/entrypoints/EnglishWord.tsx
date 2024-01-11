import '../src/index.css';
import { AppLayout } from '../src/components/AppLayout';
import React, { useEffect, useState } from 'react';
import EnglishWord, { ConversationStyle, Difficulty, Situation, VocabularyType } from '../src/models/EnglishWord';
import {
    AppBar,
    Autocomplete,
    Box,
    Button,
    Checkbox,
    FormControl,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Toolbar,
    Typography,
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useEnglishWords } from '../src/hooks/UseEnglishWords';
import ReactDOM from 'react-dom';

const toggleLabels = ["英語リスト", "英語検索"];

const App = () => {
    const [englishWords, setEnglishWords] = useState<EnglishWord[]>([]);
    const [selectedToggle, setSelectedToggle] = useState<string>(toggleLabels[0]);
    const [searchResultEnglishWords, setSearchResultEnglishWords] = useState<string[]>([]);
    const [checkedResultEnglishWords, setCheckedResultEnglishWords] = useState<string[]>([]);

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
                {selectedToggle === toggleLabels[0] ? (<EnglishWordsList englishWords={englishWords} />) : (<SearchForm searchEnglishWords={searchEnglishWords} setSearchResultEnglishWords={setSearchResultEnglishWords} searchResultEnglishWords={searchResultEnglishWords} checkedResultEnglishWords={checkedResultEnglishWords} setCheckedResultEnglishWords={setCheckedResultEnglishWords} createEnglishWords={createEnglishWords} />)}
            </AppLayout>
        </React.StrictMode>
    );
};

const Header = () => {
    return (
        <AppBar
            position="static"
            color="default"
            sx={{ boxShadow: 'none', backgroundColor: '#ffff00' }}
        >
            <Toolbar
                sx={{ padding: '0', margin: '0', backgroundColor: '#ff00ff' }}
            >
                <Title />
                <SearchEnglishWordTextField />
                <PlayEnglishWordButton />
            </Toolbar>
        </AppBar >
    )
}

const Title = () => {
    return (
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: 'block' }}
        >
            英語リスト
        </Typography>
    );
}

const SearchForm = ({ searchEnglishWords, setSearchResultEnglishWords, searchResultEnglishWords, checkedResultEnglishWords, setCheckedResultEnglishWords, createEnglishWords }) => {
    const [keyword, setKeyword] = useState<string>('');
    const [situation, setSituation] = useState<Situation | ''>('');
    const [conversationStyle, setConversationStyle] = useState<ConversationStyle | ''>('');
    const [difficulty, setDifficulty] = useState<Difficulty | ''>('');

    const handleSearch = async () => {
        const result: Object = await searchEnglishWords(keyword, situation, conversationStyle, difficulty);
        setSearchResultEnglishWords(result["english_vocabulary_list"].filter(word => word !== ""));
    };

    const handleToggle = (value: string) => () => {
        const currentIndex = checkedResultEnglishWords.indexOf(value);
        const newChecked = [...checkedResultEnglishWords];
        // 既にチェックされている場合はチェックを外し、チェックされていない場合はチェックを入れる
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setCheckedResultEnglishWords(newChecked);
    };


    return (
        <Box sx={{ marginTop: "16px", padding: "16px", border: "1px solid #e0e0e0", display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" sx={{
                marginBottom: "16px"
            }}>
                検索条件
            </Typography >
            <TextField
                label="キーワード"
                variant="outlined"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <FormControl sx={{ marginTop: "12px" }}>
                <InputLabel>シチュエーション</InputLabel>
                <Select
                    value={situation}
                    onChange={(e) => setSituation(e.target.value as Situation | '')}
                    label="シチュエーション"
                >
                    <MenuItem value={Situation.Daily}>{Situation.Daily}</MenuItem>
                    <MenuItem value={Situation.Business}>{Situation.Business}</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ marginTop: "12px" }}>
                <InputLabel>シーン</InputLabel>
                <Select
                    value={conversationStyle}
                    onChange={(e) => setConversationStyle(e.target.value as ConversationStyle | '')}
                    label="シーン"
                >
                    <MenuItem value={VocabularyType.Word}>{ConversationStyle.Casual}</MenuItem>
                    <MenuItem value={VocabularyType.Sentence}>{ConversationStyle.Formal}</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ marginTop: "12px" }}>
                <InputLabel>難しさ</InputLabel>
                <Select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as Difficulty | '')}
                    label="難しさ"
                >
                    <MenuItem value={Difficulty.Easy}>{Difficulty.Easy}</MenuItem>
                    <MenuItem value={Difficulty.Normal}>{Difficulty.Normal}</MenuItem>
                    <MenuItem value={Difficulty.Hard}>{Difficulty.Hard}</MenuItem>
                </Select>
            </FormControl>

            <Button variant="contained" onClick={handleSearch} sx={{ marginTop: "16px" }}>
                検索
            </Button>

            {searchResultEnglishWords.length > 0 ?
                <Box>
                    <List>
                        {searchResultEnglishWords.map((word: string) => {
                            const labelId = `checkbox-list-label-${word}`;

                            return (
                                <ListItemButton role={undefined} onClick={handleToggle(word)} dense
                                    sx={{
                                        borderBottom: "0.5px solid #e0e0e0",
                                    }}
                                >
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checkedResultEnglishWords.indexOf(word) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={word} />
                                </ListItemButton>
                            );
                        })}
                    </List>
                    <Box
                        sx={{ padding: "0", margin: "0", display: "flex", flexDirection: "row" }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                width: "30%", backgroundColor: "#e0e0e0", color: "#000000", ":hover": {
                                    backgroundColor: "#b0b0b0",
                                }
                            }}
                            onClick={() => createEnglishWords(checkedResultEnglishWords)}
                        >
                            クリア
                        </Button>

                        <Box sx={{ width: "16px" }} />

                        <Button
                            variant="contained"
                            sx={{ width: "70%" }}
                            onClick={() => createEnglishWords(checkedResultEnglishWords)}
                        >
                            追加
                        </Button>
                    </Box>
                </Box>
                : <></>}
        </Box >
    );
};


const EnglishWordsList = ({ englishWords }) => {
    return (
        <List>
            {englishWords.map((englishWord: EnglishWord) => {
                const labelId = `checkbox-list-label-${englishWord.id}`;

                return (
                    <ListItem
                        key={englishWord.id}
                        role={undefined}
                        sx={{
                            borderBottom: "0.5px solid #e0e0e0",
                        }}
                    >
                        <ListItemText id={labelId} primary={englishWord.word} />
                    </ListItem>
                );
            })}
        </List>
    )
}

const SearchEnglishWordTextField = () => {
    return (
        <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={[]}
            size="small"
            sx={{ flexGrow: 1, display: 'block' }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="検索したい英語を入力"
                    InputProps={{
                        ...params.InputProps,
                        type: 'search',
                    }} />
            )} />
    )
}

const PlayEnglishWordButton = () => {
    return (
        <IconButton
            aria-label="Play"
            sx={{ marginLeft: "16px" }}
        >
            <PlayCircleOutlineIcon />
        </IconButton>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);