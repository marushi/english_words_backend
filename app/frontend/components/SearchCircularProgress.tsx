import { Box, CircularProgress } from "@mui/material";
import React from "react";

export const SearchCircularProgress: React.FC = () => {
    return (
        <Box
            sx={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <CircularProgress sx={{ height: "100%" }} />
        </Box>
    )
}