import React from 'react';
import PropTypes from 'prop-types';
import 'animate.css';
import IconBlock from '../Global/IconBlock';

const BrandMetrics = ({ title, subtitle, metrics }) => {
    return (
        <div className="py-20 px-8 sm:p-20 min-h-screen text-center flex flex-col justify-center bg-cream">
            <div className='mb-16'>
                <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 text-green" data-aos="fade">{title}</h1>
                <p className="font-extralight text-base mb-8" data-aos="fade">{subtitle}</p>
            </div>

            <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-0'>
                {metrics.map((metric, idx) => (
                    <IconBlock
                        key={idx}
                        icon={metric.icon}
                        description={metric.description}
                    />
                ))}
            </div>
        </div>
    );
};

BrandMetrics.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    metrics: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.string.isRequired, // The icon associated with the metric
            description: PropTypes.string.isRequired, // The description of the metric
        })
    ).isRequired,
};

export default BrandMetrics;
