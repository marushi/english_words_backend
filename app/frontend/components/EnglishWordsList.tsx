import { Box, List, ListItemButton, ListItemText, MenuItem, Pagination, Select } from "@mui/material";
import EnglishWord from "../models/EnglishWord";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    englishWordsCountPerPageState,
    englishWordsPageState,
    englishWordsPerPageState,
    maxEnglishWordsPageState,
} from "../atoms/EnglishWords";


export const EnglishWordsList: React.FC = () => {
    const [englishWordsPage, setEnglishWordsPage] = useRecoilState(englishWordsPageState)
    const [englishWordsCountPerPage, setEnglishWordsCountPerPage] = useRecoilState(englishWordsCountPerPageState)
    const englishWordsPerPage = useRecoilValue(englishWordsPerPageState)
    const maxEnglishWordsPage = useRecoilValue(maxEnglishWordsPageState)

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <List sx={{ width: "100%" }} >
                {englishWordsPerPage.map((englishWord: EnglishWord) => {
                    const labelId = `checkbox-list-label-${englishWord.id}`;

                    return (
                        <ListItemButton
                            key={englishWord.id}
                            role={undefined}
                            sx={{
                                borderBottom: "0.5px solid #e0e0e0",
                            }}
                        >
                            <ListItemText id={labelId} primary={englishWord.word} />
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