import React, {useState} from "react";
import {OnSignInValidator} from "./validators/onSignInValidator";
import {signIn} from "../api";
import {Link, useHistory} from "react-router-dom";

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
            <small className={pClass}>
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
            <Link to = '/api/registration' >
                <p
                    className = 'registration'>
                    Зарегистрироваться
                </p>
            </Link>
        </div>
    );
}

export default SignIn;