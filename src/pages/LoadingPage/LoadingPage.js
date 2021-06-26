import React from 'react';
// third party 
// pages
// components
// styles
import './LoadingPage.scss';

const LoadingPage = () => {
    return (
        <div className='loadingpage'>
            <h1 className='loadingpage__header'>Willkommen</h1>
            <div className="progress">
                <div className="color"></div>
            </div>
        </div>
    );
};

export default LoadingPage;
