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

const SignIn = () => {
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
        backend.post(
            '/signin',
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
                setErr('Wrong username or password')
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        checkLogin();
    }, [])

    if (loged) {
        return <NotFound />
    }  else if (loged === null) {
        return <LoadingPage />
    } else {
        return (
            <div className='authentication'>
                <h2 className='authentication__header'>Anmelden</h2>
                <form className='authentication__form' onSubmit={(e) => handleSubmit(e)}>
                    <Input type={'email'} placeholder={'E-mail'} setState={setEmail} state={email} />
                    <Input type={'password'} placeholder={'Passwort'} setState={setPassword} state={password} />
                    <SubmitButton text={'Sign Ip'} />
                </form>
                <Link className='authentication__link' to="/">
                    <h4>Noch nicht registriert?</h4>
                </Link>
                <h3 className='authentication__err'>{err}</h3>
            </div>
        );
    }
};

export default SignIn;
