//create a login page
import React, { useState } from "react";
import config from '../config';

const Login = (props) => {
    const { handleLogin } = props;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch(`${config.api.url}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error || data.success === false) {
                    alert(data.error || data.message);
                    return null;
                } else {
                    return data.data;
                }
            })
            .then(data => {
                if(data){
                    localStorage.setItem("g-token", data.token);
                    window.location.href = "/";
                    handleLogin(true);
                }
            })
            .catch(err => console.log(err));
    }

    const handleChange = (e) => {
        if (e.target.id === "username") {
            setUsername(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    }

    return (
        <div className="container" style={{minHeight: 700}}>
            <div className="row">
                <div className="col-md-6 m-auto">
                    <div className="card bg-light p-5 mt-5">
                        <div className="card-title">
                            <h3 className="text-center">Login</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group p-2">
                                    <label>Username:</label>
                                    <input type="text" id="username" className="form-control" value={username} placeholder="Enter Username"  onChange={handleChange}/>
                                </div>
                                <div className="form-group p-2">
                                    <label>Password:</label>
                                    <input type="password" id="password" className="form-control" value={password} placeholder="Enter Password" onChange={handleChange}/>
                                </div>
                                <button type="submit" className="btn btn-primary m-1">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;