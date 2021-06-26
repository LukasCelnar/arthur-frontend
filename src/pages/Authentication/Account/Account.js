import React from 'react';
// third party 
// pages
// components
// styles
import './Account.scss';

const Account = () => {
    return (
        <div className='account'>
            <div className='account__user'>
                <img className='account__icon' src='/images/icons/user.svg' alt='icon' />
            </div>
        </div>
    );
};

export default Account;
