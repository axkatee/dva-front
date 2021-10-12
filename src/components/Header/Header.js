import React from "react";
import logo from "../../images/logo.png"
import './headerStyle.css';
import { useHistory } from 'react-router'

function Header(props) {
    const history = useHistory()

    const exitFunc = () => {
      localStorage.clear();
      history.push('/api/registration')
    }

    let btnElem =
      <button
          onClick={exitFunc}
          className = {props.class}>
          Выход
      </button>
    return (
        <div className = "headerItems">
            <div className = "logoAndText">
                <img
                    alt = ""
                    className = "logoImg"
                    src = {logo} />
                <p className = "headerText">
                    {props.title}
                </p>
            </div>
            {btnElem}
        </div>
    );
}

export default Header;
