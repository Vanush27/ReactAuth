import React, {SyntheticEvent, useState} from 'react';
import {Navigate} from "react-router-dom";

const Login = (props:{setName:(name:string) =>void }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [redirect, setRedirect] = useState(false);
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

       const response = await fetch("http://localhost:3000/api/register", {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            credentials : 'include',
            body : JSON.stringify( {
                email,
                password
            })
        });
        const content = await response.json();

        setRedirect(true);
        props.setName(content.name);

    }

    if(redirect){
        return <Navigate to="/login"/>
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <input type="email" className="form-control" onChange={e => setEmail(e.target.value)}
                   placeholder="Email address"/>

            <input type="password" className="form-control" onChange={e => setPassword(e.target.value)}
                   placeholder="Password"/>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    );
};

export default Login;