'use client';
import React from 'react'
import { motion } from 'framer-motion';

const IconBlock = ({ icon: icon, description: description }) => {

    return (
        <div className='flex flex-col items-center p-4'>
            <motion.img
                src={icon}
                className="h-28 mt-8 max-w-fit px-8 rounded-[50px] flex justify-center items-center"
                whileHover={{ scale: 1.1 }}
                alt={description}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            />

            <p className="mt-4 text-sm text-black">{description}</p>
        </div>
    )
}

export default IconBlock