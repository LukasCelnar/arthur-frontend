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
    const [sex, setSex] = useState('');
    const [fullName, setFullName] = useState('');
    const [yearOfBirth, setYearOfBirth] = useState(null);

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

    const handleSubmit = (e, cb) => {
        e.preventDefault();

        if (password.length < 5 || sex.length === 0 || fullName.length === 0 || new Date(yearOfBirth) > new Date()) {
            if (fullName.length === 0) {
                setErr('Please enter valid name');
            } else if (new Date(yearOfBirth) > new Date()) {
                setErr('Please enter valid year');
            } else if (password.length < 5) {
                setErr('Ihre Passwort ist zu kurtz (mindestens 5 zeichen) !');
            }  else {
                setErr('Please select your gender');
            }
            
            
        } else if (sex.length === 0) {
            setErr('Select gender');
        } else {
            backend.post(
                '/signup',
                {
                    data: {
                        fullName,
                        yearOfBirth,
                        email,
                        password,
                        sex,
                    }
                }
            )
            .then(async response => {
                if (response.data.success) {
                    const expireTime = 4/48 * 12; //24 HOURS
                    await Cookies.set('loged', { id: response.data.data.id, email: response.data.data.username, hash: response.data.data.hash, time: response.data.data.time, }, { expires: expireTime })
                    history.replace('/');
                    window.location.reload();
                    cb();
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
                    <Input type={'text'} placeholder={'Fullname'} setState={setFullName} state={fullName} />
                    <Input type={'number'} placeholder={'Year of birth'} setState={setYearOfBirth} state={yearOfBirth} />
                    <Input type={'email'} placeholder={'E-mail'} setState={setEmail} state={email} />
                    <Input type={'password'} placeholder={'Passwort'} setState={setPassword} state={password} />
                    <div className='authentication__radio'>
                        <h4>Male</h4>
                        <input type="radio" onChange={e => setSex(e.target.value)} name="gender" value='male' />
                        <h4>Feale</h4>
                        <input type="radio" onChange={e => setSex(e.target.value)} name="gender" value='female' />
                        <h4>Other</h4>
                        <input type="radio" onChange={e => setSex(e.target.value)} name="gender" value='other' />
                    </div>
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
