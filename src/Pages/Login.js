import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

import TopNav from '../Components/TopNav';

import "../Styles/Pages/Login.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (localStorage.getItem('atoken') && (typeof localStorage.getItem('atoken') == "string")) {
            navigate("/");
        }
    })

    const auth = (e) => {
        e.preventDefault();

        axios({
            method: 'post',
            url: 'https://ahiajoku-backend-web.onrender.com/login',
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                email: email,
                password: password,
            }
        })
        .then(res => {
            if (res.data.token && (typeof res.data.token == "string")) {
                localStorage.setItem('atoken', res.data.token)
                navigate("/");
            }
        })
        .catch(error => console.error(error))
    }

    return (
        <div id='login'>
            <Helmet>
                <title>Login - Ahiajioku admin</title>
                <meta name="viewport" content="width=2500,initial-scale=1,shrink-to-fit=no"/>
            </Helmet>
            <TopNav/>
            <div id='loginmain'>
                <div id='logincard'>
                    <h2>Sign in</h2>
                    <p style={{fontSize: "18px", margin: "0px", marginBottom: "4%"}}>Please Login to continue...</p>
                    <form onSubmit={auth}>
                        <label>Email</label>
                        <input type='email' placeholder='Johndoe@email.com' onChange={(e) => setEmail(e.target.value)}/>
                        <label>password</label>
                        <input type='password' onChange={(e) => setPassword(e.target.value)}/>
                        <button type='submit'>Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login