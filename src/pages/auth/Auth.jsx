import React from 'react';
import './auth.scss';
import {logIn} from "../../api/api";

const Auth = () => {

    return (
        <div className="auth">
            <div className="wrapper">
                <img src='https://cdn3.iconfinder.com/data/icons/inficons/512/github.png' alt='github-logo'/>
                <h3>Welcome</h3>
                <button onClick={logIn}>Sign in with Github</button>
            </div>
        </div>
    );
};

export default Auth;