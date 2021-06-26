import React, { useState, useEffect } from 'react';
// third party 
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
// pages
import NotFound from '../../NotFound/NotFound';
import LoadingPage from '../../LoadingPage/LoadingPage';
// components
import Input from '../../../components/Input/Input';
import SubmitButton from '../../../components/SubmitButton/SubmitButton';
import backend from '../../../api/backend';
import history from '../../../history';
// styles
import '../authentication.scss';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const [loged, setLoged] = useState(null);

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
                if (response.data.loged) {
                    history.replace('/landingpage')
                }
            })
            .catch(err => {
                console.log(err);
            })
        } else {
            setLoged(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.length < 5) {
            setErr('Ihre Passwort ist zu kurtz (mindestens 5 zeichen) !');
        } else {
            backend.post(
                '/signup',
                {
                    data: {
                        email,
                        password,
                    }
                }
            )
            .then(async response => {
                if (response.data.success) {
                    const expireTime = 4/48 * 12; //24 HOURS
                    await Cookies.set('loged', { id: response.data.data.id, email: response.data.data.username, hash: response.data.data.hash, time: response.data.data.time, }, { expires: expireTime })
                    history.replace('/');
                } else {
                    setErr('ERROR')
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    useEffect(() => {
        checkLogin();
    }, [])

    if (loged) {
        return <NotFound />
    } else if (loged === null) {
        return <LoadingPage />
    } else {
        return (
            <div className='authentication'>
                <h2 className='authentication__header'>Registrieren</h2>
                <form className='authentication__form' onSubmit={(e) => handleSubmit(e)}>
                    <Input type={'email'} placeholder={'E-mail'} setState={setEmail} state={email} />
                    <Input type={'password'} placeholder={'Passwort'} setState={setPassword} state={password} />
                    <SubmitButton text={'Registrieren'} />
                </form>
                <Link className='authentication__link' to="/signin">
                    <h4>Ich habe bereits ein Konto</h4>
                </Link>
                <h3 className='authentication__err'>{err}</h3>
            </div>
        );
    }

    
};

export default SignUp;
