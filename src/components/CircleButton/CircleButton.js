import React from 'react';
// third party 
// pages
// components
// styles
import './CircleButton.scss';

// NEED ADD PROP IMG !!!
// STUPID IDIOT WHEN YOU USE BLACK COLOR USE WHITE ICON !!!

const CircleButton = ({ img, side, color, positionFixed }) => {
    return (
        <button className={`circlebutton ${side} ${color} ${positionFixed ? 'circlebutton__fixed' : null }`}>
            <img className='circlebutton__icon' src={img} />
        </button>
    );
};

export default CircleButton;
