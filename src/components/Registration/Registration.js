import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import hospital from "../../images/hospital.png"
import './registrationStyle.css';
import Header from "../Header/Header";
import SignIn from "../Registration/SignIn";
import SignUp from "../Registration/SignUp";

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
                <Route path = "/api/registration">
                    <div>
                        <Header title = 'Зарегистрироваться в системе' class = "exit-none"/>
                        <div className = "registrationView">
                            {element}
                            <SignUp />
                        </div>
                    </div>
                </Route>
                <Route path = "/api/login">
                    <div>
                        <Header title = 'Войти в систему' class = "exit-none"/>
                        <div className = "registrationView">
                            {element}
                            <SignIn />
                        </div>
                    </div>
                </Route>
                <Redirect from="/" to="/api/registration" />
            </Switch>
        </div>
    );
}

export default Registration;
