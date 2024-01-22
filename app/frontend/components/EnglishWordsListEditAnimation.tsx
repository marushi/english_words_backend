
import React, { useEffect } from "react";

import { motion } from "framer-motion";

type Props = {
    children: React.ReactNode;
    editEnglishWordsFlag: boolean;
};

export const EnglishWordsListEditAnimation: React.FC<Props> = ({ children, editEnglishWordsFlag }) => {
    const [initialRender, setInitialRender] = React.useState<boolean>(true);

    const initialXPosition = editEnglishWordsFlag ? -40 : 0;
    const initialOpacity = editEnglishWordsFlag ? 0 : 1;
    const animateXPosition = editEnglishWordsFlag ? 0 : -40;
    const animateOpacity = editEnglishWordsFlag ? 1 : 0;
    const animateWidth = editEnglishWordsFlag ? undefined : 0;
    const duration = initialRender ? 0 : 0.5;

    useEffect(() => {
        if (initialRender) {
            setInitialRender(false);
        }
    }, []);

    return <motion.div
        className="figure2"
        initial={{ opacity: initialOpacity, x: initialXPosition }}
        animate={{ opacity: animateOpacity, x: animateXPosition, width: animateWidth }}
        transition={{ duration: duration }}>
        {children}
    </motion.div>
}