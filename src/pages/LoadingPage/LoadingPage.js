import React, {useEffect} from 'react';
// third party 
// pages
// components
// history
import history from '../../history';
// styles
import './LoadingPage.scss';

const LoadingPage = () => {
    useEffect(() => {
        setTimeout(() => {
            history.replace('/swiper')
        }, 1500)
    })

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
