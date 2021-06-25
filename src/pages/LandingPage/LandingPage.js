import React, { useEffect, useState } from 'react';
// third party 
import SwipableViews from 'react-swipeable-views'; 
// pages
// components
import CircleButton from '../../components/CircleButton/CircleButton';
// styles
import './LandingPage.scss';

const style = {
    slide1: {
        backgroundColor: '#000',
        fontSize: 20,
        minHeight: 50,
    },
    slide2: {
        backgroundColor: '#aa4587',
        fontSize: 20,
        minHeight: 50,
    },
}




const LandingPage = () => {
    const [img, setImg] = useState('/images/hard__image0.png');

    const getNextCard = () => {
        setTimeout(() => {
            setImg(`/images/hard__image${Math.floor(Math.random() * 3)}.png`)
        }, 100)
    }


    return (
        <div className='landingpage'>
            <SwipableViews enableMouseEvents index={1} onTransitionEnd={getNextCard}>
                <div>
                    DEC
                </div>
                <div className='landingpage__card'>
                    <CircleButton color={'white'} side={'left'} img={'/images/icons/block.svg'} />
                    <img className='landingpage__img' src={img} />
                    <CircleButton color={'white'} side={'right'} img={'/images/icons/heart.svg'} />
                </div>
                <div>
                    ACC
                </div>
            </SwipableViews>
            <div className='landingpage__box'>
                <CircleButton color={'black'} side={'left'} img={'/images/icons/pen.svg'} />
                <CircleButton color={'black'} side={'left'} img={'/images/icons/user.svg'} />
            </div>
            <div className='landingpage__info'>
                <h2 className='landingpage__info-header'>Jméno nějaké té pičoviny</h2>
                <p className='landingpage__info-text'>Text o té sračce z muzea od těch klobásožroutů. Text o té sračce z muzea od těch klobásožroutů.
                Text o té sračce z muzea od těch klobásožroutů.Text o té sračce z muzea od těch klobásožroutů.
                Text o té sračce z muzea od těch klobásožroutů.Text o té sračce z muzea od těch klobásožroutů.
                Text o té sračce z muzea od těch klobásožroutů.Text o té sračce z muzea od těch klobásožroutů.
                </p>
            </div>
            
        </div>
    );
};

export default LandingPage;
