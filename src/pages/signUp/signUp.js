import React, { useState } from 'react';
import './signUp.scss';
import userCircle from '../../assets/img-svg/user-circle.svg';
import passIcon from '../../assets/img-svg/password.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { handleRegister } from '../../api/apiRequest';

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleConfirmChangePassword = (e) => {
        setConfirmPassword(e.target.value)
    }
    
    const handleSubmit = async () => {
        if (!username || !password || !confirmPassword) {
            alert('Vui lòng nhập đầy đủ thông tin!');
        } else if (password === confirmPassword) {
            const newUser = {
                username: username,
                password: password,
            };
            await handleRegister(newUser, navigate);
        } else {
            alert('Mật khẩu và xác nhận mật khẩu không khớp!');
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
            <div className="form-sign-up">
                <div className="signUp">
                    <p className="text">Sign Up</p>
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
                        <div className="password">
                            <img src={passIcon} className="icon-input" alt='' />
                            <input
                                value={confirmPassword}
                                onChange={handleConfirmChangePassword}
                                type="password"
                                placeholder="Confirm Password"
                                required
                                onKeyDown={handleEnter}
                            />
                        </div>
                    </div>
                    <button className="button-submit" type="submit" onClick={handleSubmit}>Create Account</button>
                    <div style={{ marginTop: '20px', fontWeight: '500', fontSize: '16px', }}>
                        Already a member?
                        <NavLink style={{ textDecoration: 'none', color: '#283288' }} to="/signin"> Sign In</NavLink>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default SignUp;