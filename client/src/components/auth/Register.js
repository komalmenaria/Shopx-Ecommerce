import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

function Register() {

    const Navigation = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
        Navigation("/about")
     }
        }, []);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const register = async (e) => {
        e.preventDefault()
       
        let item = { name, email, password }
        console.log(item)



        await fetch("http://localhost:4000/api/register", {
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
            <div className="container my-4">
                <h1 className='mt-3'>Register Here</h1>


                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="name" autoComplete='false' required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" aria-describedby="emailHelp" autoComplete='false' required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" autoComplete='false' required />
                </div>
                <button onClick={register} className="btn btn-primary">Register</button>

            </div>

        </>
    )
}

export default Register