import React, { useEffect, useState } from 'react';
// third party 
import SwipableViews from 'react-swipeable-views'; 
import Cookies from 'js-cookie';
// pages
import LoadingPage from '../LoadingPage/LoadingPage';
import NotFound from '../NotFound/NotFound';
// components
import CircleButton from '../../components/CircleButton/CircleButton';
import history from '../../history';
import backend from '../../api/backend';
import MatchModal from '../../components/MatchModal/MatchModal';
// styles
import './LandingPage.scss';


const LandingPage = () => {
    const [img, setImg] = useState('/images/hard__image0.png');
    const [index, setIndex] = useState(1);
    const [loged, setLoged] = useState(false);
    const [object, setObject] = useState({});
    const [dataIndex, setDataIndex] = useState(0)
    const [swipes, setSwipes] = useState([])

    console.log(dataIndex)

    /*
    const checkLogin = () => {
        if (Cookies.get().loged) {
            const { id, time, hash } = JSON.parse(Cookies.get().loged);
            backend.post(
                '/checklogin',
                {
                    data: {
                        id,
                        time,
                        hash,
                    }
                }
            )
            .then(response => {
                setLoged(response.data.loged);
            })
            .catch(err => {
                console.log(err);
            })
        } else {
            setLoged(false);
        }
    }
    */

    const getCard = () => {
        backend.post(
            '/random-object',
            {dataIndex}
        )
        .then(response => {
            setObject(response.data.data);
            setDataIndex(dataIndex + 1)
        })
        .catch(err => {
            console.log(err);
        })
    }

    const getNextCard = (e) => {
        backend.post(
            '/random-object',
            {dataIndex}
        )
        .then(response => {
            setObject(response.data.data);
        })
        .catch(err => {
            console.log(err);
        })

        setIndex(e);
        if (e === 0) {
            console.log('swipe to right')
            setDataIndex(dataIndex + 1)
            setSwipes([...swipes, 1])
        } else {
            console.log('swipe to left')
            setDataIndex(dataIndex + 1)
            setSwipes([...swipes, 0])
        }
       
        setTimeout(() => {
            setIndex(1);
        }, 500)
    }

    useEffect(() => {
        //checkLogin();
        getCard();
    }, []);

    const swapingComponent = () => {
        return (
            <div className='landingpage__swiper'>
            <CircleButton positionFixed={true} color={'white'} side={'left'} img={'/images/icons/block.svg'} />
            <SwipableViews hysteresis={0.7} resistance={true} enableMouseEvents index={index} onChangeIndex={(e) => getNextCard(e)}>
                <div>
                    
                </div>
                <div className='landingpage__card'>
                    <img className='landingpage__img' alt='object' src={object.filePath} />     
                </div>
                <div>

                </div>
            </SwipableViews>
            <CircleButton positionFixed={true} color={'white'} side={'right'} img={'/images/icons/heart.svg'} />
            </div>
        )
    }
        return (
            <div className='landingpage'>
                <div className='landingpage__box'>
                    <CircleButton positionFixed={false} color={'black'} side={'left'} img={'/images/icons/user.svg'} />
                </div>
                    {swapingComponent()}
                    {dataIndex > 5 ? <MatchModal data={swipes} /> : null}
                    
                <div className='landingpage__info'>
                    <h2 className='landingpage__info-header'>{object.title}</h2>
                    <p className='landingpage__info-text'>
                        {object.description}
                    </p>
                </div>
                
            </div>
        );
};

export default LandingPage;
