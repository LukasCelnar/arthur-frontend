import React from 'react';
// third party 
// pages
// components
// styles
import './LoadingPage.scss';

const LoadingPage = () => {
    return (
        <div className='loadingpage'>
            <h1 className='loadingpage__header'>welcome</h1>
            <div class="progress">
                <div class="color"></div>
            </div>
        </div>
    );
};

export default LoadingPage;
