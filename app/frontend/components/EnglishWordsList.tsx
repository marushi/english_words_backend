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
    maxEnglishWordsPageState,
} from "../atoms/EnglishWords";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { editEnglishWordsFlagState } from "../atoms/EditENglishWordsFlag";


export const EnglishWordsList: React.FC = () => {
    const [englishWordsPage, setEnglishWordsPage] = useRecoilState(englishWordsPageState)
    const [englishWordsCountPerPage, setEnglishWordsCountPerPage] = useRecoilState(englishWordsCountPerPageState)
    const englishWordsPerPage = useRecoilValue(englishWordsPerPageState)
    const maxEnglishWordsPage = useRecoilValue(maxEnglishWordsPageState)
    const [editEnglishWordsFlag] = useRecoilState(editEnglishWordsFlagState)
    const [checkedEnglishWords, setCheckedEnglishWords] = useState<EnglishWord[]>([]);

    const handleToggle = (value: EnglishWord) => () => {
        const currentIndex = checkedEnglishWords.indexOf(value);
        const newChecked = [...checkedEnglishWords];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setCheckedEnglishWords(newChecked);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {actionButtons({ setCheckedEnglishWords })}
            <List sx={{ width: "100%" }} >
                {englishWordsPerPage.map((englishWord: EnglishWord) => {
                    const labelId = `checkbox-list-label-${englishWord.id}`;

                    return (
                        <ListItemButton
                            key={englishWord.id}
                            role={undefined}
                            onClick={handleToggle(englishWord)}
                            sx={{
                                borderBottom: "0.5px solid #e0e0e0",
                            }}
                        >
                            {editEnglishWordsFlag
                                ? <ListItemIcon>
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
                                : <></>
                            }
                            <ListItemText id={labelId} primary={englishWord.word} />
                            <ChevronRightIcon sx={{ color: "#c0c0c0" }} />
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
                }
                }
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

const actionButtons = ({ setCheckedEnglishWords }) => {
    const [editEnglishWordsFlag, setEditEnglishWordsFlag] = useRecoilState(editEnglishWordsFlagState)

    const handleEditEnglishWords = () => {
        setEditEnglishWordsFlag(!editEnglishWordsFlag)
        setCheckedEnglishWords([])
    }
    return (
        <Box sx={{ display: "flex", width: "100%" }} >
            <Box sx={{ ml: "auto", mr: "12px" }} >
                {editEnglishWordsFlag
                    ? <IconButton size="small">
                        <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                    : <></>
                }
                <IconButton size="small">
                    <EditIcon sx={{ color: "#c0c0c0" }} onClick={() => { handleEditEnglishWords() }} />
                </IconButton>
                <IconButton>
                    <FilterListIcon sx={{ color: "#c0c0c0" }} />
                </IconButton>
                <IconButton>
                    <PlayCircleOutlineIcon sx={{ color: "#c0c0c0" }} />
                </IconButton>
            </Box>
        </Box>
    )
}