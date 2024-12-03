'use client';  // Ensure this is rendered on the client-side

import { motion } from 'framer-motion';

const FillButton = ({
    text = "Click Me",
    color = "bg-blue-500",
    text_color = "text-white",
    url = "#"
}) => {
    return (
        <button src={url}>
            <motion.div
                className={`h-12 max-w-fit my-8 px-8 cursor-pointer rounded-[50px] ${color} flex justify-center items-center`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
                <span className={`text-sm sm:text-base ${text_color} lg:text-lg font-medium`}>{text}</span>
            </motion.div>
        </button>
    );
};

export default FillButton;
