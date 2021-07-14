import React from 'react';
import classes from './Page.module.css';
import { motion } from 'framer-motion';
const Page = (props) => {
    return (
        <motion.div
            className={classes['page-body']}
            variants={props.pageVariants}
            transition={props.pageTransition}
            initial="out"
            animate="in"
            exit="out"
        >
            {props.children}
        </motion.div>
    );
}

export default Page;