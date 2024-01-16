import { List, ListItemButton, ListItemText } from "@mui/material";
import EnglishWord from "../models/EnglishWord";
import React from "react";


type Props = {
    englishWords: EnglishWord[],
};

export const EnglishWordsList: React.FC<Props> = ({ englishWords }: Props) => {
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