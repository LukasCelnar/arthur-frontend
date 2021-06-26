import React from 'react';
// third party 
// pages
// components
// styles
import './Input.scss';

const Input = ({ type, placeholder, state, setState }) => {
    return (
        <input type={type} placeholder={placeholder} onChange={(e) => setState(e.target.value)} className='input' value={state} />
    );
};

export default Input;
