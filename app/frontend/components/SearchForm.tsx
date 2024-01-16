import '../src/index.css';
import React, { SetStateAction, useState } from 'react';
import { ConversationStyle, Difficulty, Situation, VocabularyType } from '../models/EnglishWord';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    InputLabel,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useRecoilState } from 'recoil';
import { searchEnglishWordsFlagState } from '../atoms/SearchEnglishWordsFlag';

type Props = {
    searchEnglishWords: (keyword: string, situation: Situation | '', conversationStyle: ConversationStyle | '', difficulty: Difficulty | '') => Promise<Object>,
    setSearchResultEnglishWords: React.Dispatch<React.SetStateAction<string[]>>,
    searchResultEnglishWords: string[],
    checkedResultEnglishWords: string[],
    setCheckedResultEnglishWords: React.Dispatch<React.SetStateAction<string[]>>,
    createEnglishWords: (checkedResultEnglishWords: string[]) => void,
};

export const SearchForm = ({ searchEnglishWords, setSearchResultEnglishWords, searchResultEnglishWords, checkedResultEnglishWords, setCheckedResultEnglishWords, createEnglishWords }: Props) => {
    const [keyword, setKeyword] = useState<string>('');
    const [situation, setSituation] = useState<Situation | ''>('');
    const [conversationStyle, setConversationStyle] = useState<ConversationStyle | ''>('');
    const [difficulty, setDifficulty] = useState<Difficulty | ''>('');
    const [searchEnglishWordsFlag, setSearchEnglishWordsFlag] = useRecoilState(searchEnglishWordsFlagState)

    const disableSearch = () => {
        return searchEnglishWordsFlag || searchResultEnglishWords.length > 0;
    }

    const handleSearch = async () => {
        if (disableSearch()) return;

        setSearchEnglishWordsFlag(true);
        try {
            const result: Object = await searchEnglishWords(keyword, situation, conversationStyle, difficulty);
            setSearchResultEnglishWords(result["english_vocabulary_list"].filter((word: string) => word !== ""));
        } catch (error) {
            console.log(error);
        } finally {
            setSearchEnglishWordsFlag(false);
        }
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

    const handleClearSearchEnglishWordsResult = () => {
        setSearchResultEnglishWords([]);
        setCheckedResultEnglishWords([]);
    }

    return (
        <Box sx={{ marginTop: "16px", padding: "16px", border: "1px solid #e0e0e0", display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" sx={{
                marginBottom: "16px"
            }}>
                検索条件
            </Typography>
            <TextField
                label="キーワード"
                variant="outlined"
                value={keyword}
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setKeyword(e.target.value)} />
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

            <Button
                color="primary"
                disabled={disableSearch()}
                variant="contained"
                onClick={handleSearch}
                sx={{ marginTop: "16px" }}>
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
                                            inputProps={{ 'aria-labelledby': labelId }} />
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
                            onClick={() => handleClearSearchEnglishWordsResult()}
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
        </Box>
    );
};

