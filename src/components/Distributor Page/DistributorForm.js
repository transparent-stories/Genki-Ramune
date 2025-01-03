import React from 'react'

const DistributorForm = ({ heading }) => {
    return (
        <div className="pb-10 px-8 sm:p-20 text-center">
            <div className='mb-10'>
                <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 text-green" data-aos="zoom-in-up">{heading}</h1>
            </div>
        </div>
    )
}

export default DistributorForm