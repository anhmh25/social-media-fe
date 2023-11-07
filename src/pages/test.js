import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Test = () => {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        username: username,
        password: password,
      });
      console.log('Đăng nhập thành công:', response.data);

      // Lưu thông tin người dùng vào biến user
      const user = response.data.user;

      // Chuyển hướng đến trang "Home" và truyền thông tin người dùng qua đối tượng state
      navigate('/home', { state: { user: user } });
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
    }
  }


    return (
        <div>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Đăng ký</button>
        </div>
    );
};

export default Test;
