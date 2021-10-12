import React, {useState} from "react";
import {useHistory} from "react-router";
import {OnSignUpValidator} from "./validators/onSignUpValidator";
import {signUp} from "../api";
import {Link} from "react-router-dom";

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
            <Link to = '/api/login'>
                <p className = 'autorization'>
                    Авторизоваться
                </p>
            </Link>
        </div>
    );
}

export default SignUp;