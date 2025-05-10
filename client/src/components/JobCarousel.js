// src/components/JobsCarousel.js
import React from 'react';
import { Carousel } from 'react-bootstrap';

const JobsCarousel = ({ jobs }) => {
    const [index, setIndex] = React.useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
            {jobs.map((job) => (
                <Carousel.Item key={job.id}>
                    <div className="card job-card">
                        {/* Your job card content */}
                    </div>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default JobsCarousel;