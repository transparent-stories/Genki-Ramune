'use client';
import React from 'react'
import { motion } from 'framer-motion';

const PerkIcon = ({ icon: icon, title: title, content: content }) => {

    return (
        <div className='flex flex-col items-center sm:p-4'>
            <motion.img
                src={icon}
                className="h-28 mt-8 max-w-fit px-8 rounded-[50px] flex justify-center items-center z-10"
                whileHover={{ scale: 1.1 }}
                alt={title}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            />

            <div className='bg-cream px-5 py-10 sm:py-16 mt-[-40px] rounded-md'>
                <h4 className="mt-4 text-sm text-black font-bold">{title}</h4>
                <p className="mt-4 text-xs text-black">
                    {content}
                </p>
            </div>
        </div>
    )
}

export default PerkIcon