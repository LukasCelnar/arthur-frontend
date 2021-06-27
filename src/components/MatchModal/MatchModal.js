import React, {useEffect} from 'react';
// third party 
import backend from '../../api/backend';
// pages
// components
// styles
import './MatchModal.scss';

const MatchModal = ({data}) => {
    const onHandleClick = () => {
        window.location.href = "https://google.com/"
    }

    useEffect(() => {
        backend.post('/create-match', { swipes: data })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='match-modal'>
            <div className='match-modal__container'>
                <h6  className='match-modal__title'>Its a Match!</h6>
                <img  className='match-modal__icon' src='/images/icons/avatar.png' alt='error' />
                <h4 className='match-modal__chat-btn' onClick={() => onHandleClick()}>Click to Chat!</h4>                
            </div>

        </div>
    );
};

export default MatchModal;