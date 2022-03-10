import React, { useState, useEffect, Componenet } from "react";
import axios from "axios";
import { Navigate } from 'react-router-dom';
import MainPage from "./MainPage";
// import "./Login.css"
export default function Login({ setUser, setShow }) {
    setShow(false);
    const [navigate, setNavigate] = useState(false);
    const [input, setInput] = useState({
        username: '',
        password: ''
    })

    function handleChange(event) {
        const { name, value } = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }
    function validateForm() {
        return input.username.length > 0 && input.password.length > 0;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newManager = {
            username: input.username,
            password: input.password
        }
        console.log(newManager);

        const res = await axios.post('http://localhost:3001/manager/validateUser', newManager);
        console.log("res", res);
        if (res.data.valid === true) {
            console.log("ok");

            const id = await axios.get(`http://localhost:3001/manager/getId/${input.username}/${input.password}`);
            console.log(id);
            setUser(id);
            setNavigate(true);
        }
        if (res.data === false) {
            console.log("No");

        }
    }
    if (navigate) {

        return <Navigate to="/home" />
    }

    else return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={handleSubmit}>

                    <h1> Ordman Suppliers </h1>

                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>User Name</label>
                        <input onChange={handleChange}
                            name="username"
                            value={input.username}
                            type="text"
                            className="form-control"
                            placeholder="Enter user name"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input onChange={handleChange}
                            name="password"
                            value={input.password}
                            type="password"
                            className="form-control"
                            placeholder="Enter password"

                        />
                    </div>
                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mt-3" disabled={!validateForm()}>Submit</button>
                    <p className="forgot-password text-right">
                        Forgot <a href="google.com">password?</a>
                    </p>
                </form>
            </div>
        </div>
    );
}