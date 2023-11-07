import React, { useState } from 'react';
import './signIn.scss';
import userCircle from '../../assets/img-svg/user-circle.svg';
import passIcon from '../../assets/img-svg/password.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { handleLogin } from '../../api/apiRequest';

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async () => {
        if (!username || !password) {
            alert('Vui lòng nhập đầy đủ thông tin!');
        } else {
            const newUser = {
                username: username,
                password: password,
            };
            await handleLogin(newUser, navigate)
        }
    }

    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            e.stopPropagation();
            handleSubmit();
        }
    }
    
    return (
        <div className="container">
            <div className="form-sign-in">
                <div className="signIn">
                    <p className="text">Sign In</p>
                    <div className="box-input">
                        <div className="user-name">
                            <img src={userCircle} className="icon-input" alt='' />
                            <input
                                value={username}
                                onChange={handleChangeUsername}
                                type="text"
                                placeholder="Username"
                                required
                                onKeyDown={handleEnter}
                            />
                        </div>
                        <div className="password">
                            <img src={passIcon} className="icon-input" alt='' />
                            <input
                                value={password}
                                onChange={handleChangePassword}
                                type="password"
                                placeholder="Password"
                                required
                                onKeyDown={handleEnter}
                            />
                        </div>
                    </div>
                    <button className="button-submit" onClick={handleSubmit}>Sign In</button>
                    <div style={{ marginTop: '20px', fontWeight: '500', fontSize: '16px', }}>
                        Don’t have an account?
                        <NavLink style={{ textDecoration: 'none', color: '#283288' }} to="/signup"> Sign Up Now</NavLink>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default SignIn;