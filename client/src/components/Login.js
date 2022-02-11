import React, { useState } from "react";
import axios from "axios";

export default function LoginT(props) {

    const [auth, setAuth] = useState(true);
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

    function setUser(user) {
        window.sessionStorage.setItem('auth', true);
        window.sessionStorage.setItem('name', user.username);
        window.sessionStorage.setItem('id', user._id);
    }

    function logoutUser() {
        window.sessionStorage.setItem('auth', null);
        window.sessionStorage.setItem('name', null);
        window.sessionStorage.setItem('id', null);
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
            console.log(res.data.user);
            setUser(res.data.user);
            setAuth(true);
            props.setLogin(true);
        }
        if (res.data === false) {
            logoutUser();
            setAuth(false);
            console.log(auth);

        }
    }
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={handleSubmit}>

                    <h1> Ordman Suppliers </h1>

                    <h3>כניסה</h3>

                    <div className="form-group">
                        <label>שם משתמש</label>
                        <input onChange={handleChange}
                            name="username"
                            value={input.username}
                            type="text"
                            className="form-control"
                            placeholder="הכנס שם משתמש"
                        />
                    </div>
                    <br></br>

                    <div className="form-group">
                        <label>סיסמה</label>
                        <input onChange={handleChange}
                            name="password"
                            value={input.password}
                            type="password"
                            className="form-control"
                            placeholder="הכנס סיסמה"
                        />
                    </div>
                    {!auth && <p>שם משתמש וסיסמה שגויים, נסה שנית</p>}
                    <br></br>
                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label m-1" htmlFor="customCheck1">זכור אותי</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" disabled={!validateForm()}>כניסה</button>
                    <p className="forgot-password text-right">
                        שכחת <a href="google.com">סיסמה?</a>
                    </p>
                </form>
            </div>
        </div>
    );
}