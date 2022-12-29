import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

function Login() {
    const Navigation = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
        Navigation("/about")
     }
        }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    async function login() {
        let item = { email, password }
        console.log(item)
        await fetch("http://localhost:4000/api/login", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then(async (result) => {
            if (result.status == 200) {
                result = await result.json()
                localStorage.setItem("token", result.token)
                localStorage.setItem("user-info", JSON.stringify(result.user))
                Navigation("/about")
                console.log(result)
            }else{
                result = await result.json()
                alert(result.msg)
            }

        })
            .catch(error => console.log('error', error));
    }
    return (
        <>
            <div className="container my-3">
                <h1>Login Here</h1>
                <div className="form-group">
                    <label htmlFor="email">Email </label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" />
                </div>
                <button type="submit" onClick={login} className="btn btn-primary">Login</button>

            </div>
        </>
    )
}

export default Login