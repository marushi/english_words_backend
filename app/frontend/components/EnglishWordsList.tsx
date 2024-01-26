import {
    Box,
    Checkbox,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Pagination,
    Select,
} from "@mui/material";
import EnglishWord from "../models/EnglishWord";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    englishWordsCountPerPageState,
    englishWordsPageState,
    englishWordsPerPageState,
    englishWordsState,
    maxEnglishWordsPageState,
    selectedEnglishWordState,
} from "../atoms/EnglishWords";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EditIcon from '@mui/icons-material/Edit';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { EditEnglishWordsFlagState } from "../atoms/EditEnglishWordsFlagState";
import { EnglishWordsListEditAnimation } from "./EnglishWordsListEditAnimation";
import { EnglishWordsDelete } from "./EnglishWordsDelete";
import { useEnglishWords } from "../hooks/UseEnglishWords";
import { useNavigate } from "react-router-dom";

export const EnglishWordsList: React.FC = () => {
    const [englishWordsPage, setEnglishWordsPage] = useRecoilState(englishWordsPageState)
    const [englishWordsCountPerPage, setEnglishWordsCountPerPage] = useRecoilState(englishWordsCountPerPageState)
    const englishWordsPerPage = useRecoilValue(englishWordsPerPageState)
    const maxEnglishWordsPage = useRecoilValue(maxEnglishWordsPageState)
    const [editEnglishWordsFlag] = useRecoilState(EditEnglishWordsFlagState)
    const [checkedEnglishWords, setCheckedEnglishWords] = useState<EnglishWord[]>([]);
    const [, setEnglishWords] = useRecoilState(englishWordsState)
    const [, setSelectedEnglishWord] = useRecoilState(selectedEnglishWordState)
    const navigate = useNavigate();

    const handleToggle = (value: EnglishWord) => {
        const currentIndex = checkedEnglishWords.indexOf(value);
        const newChecked = [...checkedEnglishWords];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setCheckedEnglishWords(newChecked);
    };

    const handleTapEnglishWord = (englishWord: EnglishWord) => {
        if (editEnglishWordsFlag) {
            handleToggle(englishWord)
        } else {
            setSelectedEnglishWord(englishWord)
            navigate('/english_words/' + englishWord.id)
        }
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {actionButtons({ setCheckedEnglishWords, checkedEnglishWords, setEnglishWords })}
            <List sx={{ width: "100%" }} >
                {englishWordsPerPage.map((englishWord: EnglishWord) => {
                    const labelId = `checkbox-list-label-${englishWord.id}`;

                    return (
                        <ListItemButton
                            key={englishWord.id}
                            role={undefined}
                            onClick={() => { handleTapEnglishWord(englishWord) }}
                            sx={{
                                borderBottom: "0.5px solid #e0e0e0",
                            }}
                        >
                            {checkBox({ editEnglishWordsFlag, checkedEnglishWords, englishWord, labelId })}
                            <ListItemText id={labelId} primary={englishWord.word} />
                            <EnglishWordsListEditAnimation editEnglishWordsFlag={!editEnglishWordsFlag} >
                                <ChevronRightIcon sx={{ color: "#c0c0c0" }} />
                            </EnglishWordsListEditAnimation>
                        </ListItemButton>
                    );
                })}
            </List>
            <Pagination count={maxEnglishWordsPage} page={englishWordsPage} onChange={(e, page) => {
                setEnglishWordsPage(page)
            }} />
            <Select
                value={englishWordsCountPerPage}
                onChange={(e) => {
                    setEnglishWordsCountPerPage(Number(e.target.value))
                }}
                inputProps={{
                    name: 'maxEnglishWordsPage',
                    id: 'maxEnglishWordsPage',
                }}
                sx={{ height: "36px", margin: "12px" }}
            >
                {[10, 20, 30, 50, 100].map((countPerPage) => {
                    return <MenuItem
                        key={countPerPage}
                        value={countPerPage}>
                        <ListItemText primary={countPerPage} />
                    </MenuItem>
                })}
            </Select>
        </Box>
    )
}

const checkBox = ({ editEnglishWordsFlag, checkedEnglishWords, englishWord, labelId }) => {
    return <EnglishWordsListEditAnimation
        editEnglishWordsFlag={editEnglishWordsFlag}
    >
        <ListItemIcon>
            <Checkbox
                size="small"
                edge="start"
                checked={checkedEnglishWords.indexOf(englishWord) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
                sx={{ height: "18px" }}
            />
        </ListItemIcon>
    </EnglishWordsListEditAnimation>
}

const actionButtons = ({ setCheckedEnglishWords, checkedEnglishWords, setEnglishWords }) => {
    const [editEnglishWordsFlag, setEditEnglishWordsFlag] = useRecoilState(EditEnglishWordsFlagState);
    const { deleteEnglishWords } = useEnglishWords();

    const handleEditEnglishWords = () => {
        setEditEnglishWordsFlag(!editEnglishWordsFlag)
        setCheckedEnglishWords([])
    }

    const handleDeleteEnglishWords = () => {
        deleteEnglishWords(checkedEnglishWords, setEnglishWords)
    }

    return (
        <Box sx={{ display: "flex", width: "100%" }} >
            <Box sx={{ ml: "auto", mr: "12px", display: "flex", flexDirection: "row" }}>
                <EnglishWordsListEditAnimation editEnglishWordsFlag={editEnglishWordsFlag}>
                    <EnglishWordsDelete editEnglishWordsFlag={editEnglishWordsFlag} deleteEnglishWords={handleDeleteEnglishWords} />
                </EnglishWordsListEditAnimation>
                <IconButton >
                    <EditIcon sx={{ color: "#a0a0a0" }} onClick={() => { handleEditEnglishWords() }} />
                </IconButton>
                <IconButton>
                    <PlayCircleOutlineIcon sx={{ color: "#a0a0a0" }} />
                </IconButton>
            </Box>
        </Box>
    )
}