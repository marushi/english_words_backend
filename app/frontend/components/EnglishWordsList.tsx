import { List, ListItemButton, ListItemText } from "@mui/material";
import EnglishWord from "../models/EnglishWord";
import React from "react";
import { useRecoilValue } from "recoil";
import { englishWordsState } from "../atoms/EnglishWords";


export const EnglishWordsList: React.FC = () => {
    const englishWords = useRecoilValue(englishWordsState)

    return (
        <List>
            {englishWords.map((englishWord: EnglishWord) => {
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
    )
}