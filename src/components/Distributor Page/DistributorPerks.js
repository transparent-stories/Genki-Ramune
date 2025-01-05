import React from 'react';
import PropTypes from 'prop-types';
import 'animate.css';
import PerkIcon from './PerkIcon';
import FillButton from '../Global/Buttons/FillButton';

const DistributorPerks = ({ heading, perks }) => {
    return (
        <div className="py-10 px-8 sm:p-20 text-center">
            <div className='mb-10'>
                <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 text-green" data-aos="zoom-in-up">{heading}</h1>
            </div>

            <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4'>
                {perks.map((perk, idx) => (
                    <PerkIcon
                        key={idx}
                        icon={perk.icon}
                        title={perk.title}
                        content={perk.content}
                    />
                ))}
            </div>

            <div className='flex justify-center items-center'>
                <FillButton text="Join Us" color="bg-green" text_color="text-white" url="/posts" />
            </div>
        </div>
    );
};

DistributorPerks.propTypes = {
    title: PropTypes.string.isRequired,
    perks: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.string.isRequired, // The icon associated with the metric
            title: PropTypes.string.isRequired, // The icon associated with the metric
            content: PropTypes.string.isRequired, // The description of the metric
        })
    ).isRequired,
};

export default DistributorPerks;
