import React from 'react';
import PropTypes from 'prop-types';
import 'animate.css';
import IconBlock from '../Global/IconBlock';

const BrandMetrics = ({ title, subtitle, metrics }) => {
    return (
        <div className="p-20 text-center bg-cream">
            <div className='mb-10'>
                <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 text-green" data-aos="zoom-in-up">{title}</h1>
                <p className="mb-4" data-aos="fade-in-up">{subtitle}</p>
            </div>

            <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4'>
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
