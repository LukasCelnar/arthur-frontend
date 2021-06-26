import React from 'react';
// third party 
// pages
// components
// styles
import './SubmitButton.scss';

const SubmitButton = ({ text }) => {
    return (
        <button type='submit' className='submitbutton'>{text}</button>
    );
};

export default SubmitButton;
