import React, { useState } from "react";
import hospital from "../../images/hospital.png"
import './registrationStyle.css';
import Header from "../Header/Header";
import { OnSignInValidator } from "./validators/onSignInValidator"
import { OnSignUpValidator } from "./validators/onSignUpValidator"
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { signUp } from '../api'
import { signIn } from '../api'
import { useHistory } from 'react-router'

function Registration() {
    const element =
            <img
                alt = ""
                src = {hospital}
                className = "hospitalImg"
            />;
    return (
        <div>
            <Switch>
                <Route path = "/api/signup/registration">
                    <div>
                        <Header title = 'Зарегистрироваться в системе' class = "exit-none"/>
                        <div className = "registrationView">
                            {element}
                            <SignUp />
                        </div>
                    </div>
                </Route>
                <Route path = "/api/signup/login">
                    <div>
                        <Header title = 'Войти в систему' class = "exit-none"/>
                        <div className = "registrationView">
                            {element}
                            <SignIn />
                        </div>
                    </div>
                </Route>
                <Redirect from="/" to="/api/signup/registration" />
            </Switch>
        </div>
    );
}

function SignIn() {
    const [input, setInput] = useState({email: '', password: ''});
    const [lText, setLText] = useState('');
    const [pText, setPText] = useState('');
    const [pClass, setPClass] = useState('pPassword-none');
    const [lClass, setLClass] = useState('pLogin-none');
    const [lError, setLError] = useState('');
    const history = useHistory()

    const handleSignIn = async () => {
      const valid = OnSignInValidator(
          input,
          setPText,
          setLText,
          setPClass,
          setLClass
      )
      if(valid) {
        const response = await signIn(input.email, input.password);
        if(response._status !== 200) return setLError(response.message);
        localStorage.setItem('auth_data', JSON.stringify({
            access_token: response.token,
            refresh_token: response.refToken
        }));
        history.push('/home')
        alert(`Добро пожаловать, ${response.user.email}!`);
      }
    }

    return (
        <div className = "signBlock">
            <p className = 'titleSignInText'>
                Войти в систему
            </p>
            <p className='signInP'>
                Login:
            </p>
            <input
                value={input.email}
                onChange={(e) =>
                    {setInput({...input, email: e.target.value})}}
                type = 'text'
                placeholder = 'Login'
                className = 'loginInputSignIn'
            />
            <small className = {lClass}>
                {lText}
            </small>
            <p className='signInP'>
                Password:
            </p>
            <input
                value={input.password}
                onChange={(e) =>
                    {setInput({...input, password: e.target.value})}}
                type = 'password'
                placeholder = 'Password'
                className = 'passwordInputSignIn' />
            <small className={pClass}
                >
                {pText}
            </small>
            <button
                onClick = {handleSignIn}
                className = 'signInBtn'>
                Войти
            </button>
            { lError && <small>
              {lError}
            </small> }
            <Link to = '/api/signup/registration' >
                <p
                className = 'registration'>
                Зарегистрироваться
                </p>
            </Link>
        </div>
    );
}

function SignUp() {
    const [regInput, setRegInput] = useState({regEmail: '', regPassword: '', repeatPassword: ''});
    const [lRegText, setLRegText] = useState('');
    const [pRegText, setPRegText] = useState('');
    const [pRepeatPassText, setPRepeatPassText] = useState('');
    const [pRegClass, setPRegClass] = useState('pPassword-none');
    const [repeatPassClass, setRepeatPassClass] = useState('pRepeatPassClass-none');
    const [lRegClass, setLRegClass] = useState('pLogin-none');
    const [pRegResponseError, setPRegResponseError] = useState('');
    const history = useHistory()

    const handleSignUp = async () => {
      const valid = OnSignUpValidator(
        regInput,
        setLRegText,
        setPRegText,
        setPRepeatPassText,
        setPRegClass,
        setLRegClass,
        setRepeatPassClass
      );
      if(valid) {
        const response = await signUp(regInput.regEmail, regInput.regPassword)
        if(response._status !== 200) return setPRegResponseError(response.message)
          localStorage.setItem('auth_data', JSON.stringify({
              access_token: response.token,
              refresh_token: response.refToken
          }));
        history.push('/home')
        alert('Добро пожаловать, ' + response.userData.user.email + '!');
      }
    }

    return (
        <div className = "signBlock">
            <p className = 'titleSignInText'>
                Регистрация
            </p>
            <p className='signInP'>
                Login:
            </p>
            <input
                value={regInput.regEmail}
                onChange={(e) =>
                    {setRegInput({...regInput, regEmail: e.target.value})}}
                type = 'text'
                placeholder = 'Login'
                className = 'loginInputSignIn'/>
            <small className = {lRegClass}>
                {lRegText}
            </small>
            <p className='signInP'>
                Password:
            </p>
            <input
                value={regInput.regPassword}
                onChange={(e) =>
                    {setRegInput({...regInput, regPassword: e.target.value})}}
                type = 'password'
                placeholder = 'Password'
                className = 'passwordInputSignIn' />
            <small className = {pRegClass}>
                {pRegText}
            </small>
            <p className='signInP'>
                Repeat password:
            </p>
            <input
                value={regInput.repeatPassword}
                onChange={(e) =>
                    {setRegInput({...regInput, repeatPassword: e.target.value})}}
                type = 'password'
                placeholder = 'Password'
                id = 'passwordInputSignInRepeat'
                className = 'passwordInputSignIn' />
            <small className = {repeatPassClass}>
                {pRepeatPassText}
            </small>
            {pRegResponseError && <small className = {repeatPassClass}>
                Ошибка: {pRegResponseError}
            </small>}
            <button
                onClick={handleSignUp}
                className = 'registrationBtn'>
                Зарегистрироваться
            </button>
            <Link to = '/api/signup/login'>
                <p className = 'autorization'>
                    Авторизоваться
                </p>
            </Link>
        </div>
    );
}

export default Registration;
