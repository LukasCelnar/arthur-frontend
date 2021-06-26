import React, { useEffect, useState } from 'react';
// third party 
import SwipableViews from 'react-swipeable-views'; 
// pages
import LoadingPage from '../LoadingPage/LoadingPage';
// components
import CircleButton from '../../components/CircleButton/CircleButton';
import history from '../../history';
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
    const [index, setIndex] = useState(1);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const getCard = () => {
        setTimeout(() => {
            setImg(`/images/hard__image${Math.floor(Math.random() * 3)}.png`)
        }, 100)
    }

    const getNextCard = (e) => {
        if (count >= 5) {
            setTimeout(() => {
                history.replace('/signup'); 
            }, 500) 
        }

        setIndex(e);
        setCount(count+1);
        setTimeout(() => {
            setIndex(1);
            setImg(`/images/hard__image${Math.floor(Math.random() * 3)}.png`)
        }, 500)
    }

    useEffect(() => {
        getCard()
        setTimeout(() => {
            setLoading(false);
        }, 3000)
    }, [])

    const swapingComponent = () => {
        return (
            <div className='landingpage__swiper'>
            <CircleButton positionFixed={true} color={'white'} side={'left'} img={'/images/icons/block.svg'} />
            <SwipableViews enableMouseEvents index={index} onChangeIndex={(e) => getNextCard(e)}>
                <div>
                    
                </div>
                <div className='landingpage__card'>
                    <img className='landingpage__img' src={img} />     
                </div>
                <div>

                </div>
            </SwipableViews>
            <CircleButton positionFixed={true} color={'white'} side={'right'} img={'/images/icons/heart.svg'} />
            </div>
        )
    }

    if (loading) {
        return <LoadingPage />
    } else {
        return (
            <div className='landingpage'>
                    
                    {swapingComponent()}
                    
                <div className='landingpage__box'>
                    <CircleButton positionFixed={false} color={'black'} side={'left'} img={'/images/icons/pen.svg'} />
                    <CircleButton positionFixed={false} color={'black'} side={'left'} img={'/images/icons/user.svg'} />
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
    }
};

export default LandingPage;
