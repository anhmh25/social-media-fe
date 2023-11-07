import axios from 'axios';

const urlApi = process.env.REACT_APP_API_URL;

export const handleLogin = async (user, navigate) => {
    console.log(urlApi)
    try {
        const response = await axios.post(`${urlApi}/login`, user);
        console.log('Đăng nhập thành công:', response.data);

        const userLogin = response.data.user;

        navigate('/home');
        localStorage.setItem('user', JSON.stringify(userLogin));
    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
        } else {
            alert('Lỗi khi đăng nhập. Vui lòng thử lại sau.');
        }
    }
}

export const handleRegister = async (user, navigate) => {
    await axios.post(`${urlApi}/register`, user)
        .then(response => {
            console.log('Tài khoản đã được tạo:', response.data);
            alert('Tài khoản đã được tạo thành công!');
            navigate('/signin');
        })
        .catch(error => {
            console.error('Lỗi khi tạo tài khoản:', error);
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('Lỗi khi tạo tài khoản. Vui lòng thử lại sau.');
            }
        });
};

export const handleCreatPost = async (data) => {
    try {
        axios.post(`${urlApi}/post`, data)
    } catch(error) {
        console.log("Lỗi:", error);
    }  
}

export const handleDeletePost = async (data) => {
    try {
        axios.post(`${urlApi}/deletePost`, data)
        alert('Bài viết đã được xóa!');
    } catch(error) {
        console.log("Lỗi:", error);
        alert('Xóa không thành công!');
    }  
}

export const handleAddLikePost = async (data) => {
    try {
        axios.post(`${urlApi}/addLike`, data)
    } catch(error) {
        console.log("Lỗi:", error);
    }  
}

export const handleRemoveLikePost = async (data) => {
    try {
        axios.post(`${urlApi}/removeLike`, data);
    } catch(error) {
        console.log("Lỗi:", error);
    }  
}

export const handleCreatComment = async (data) => {
    try {
        await axios.post(`${urlApi}/comment`, data)

    } catch(error) {
        console.log("Lỗi:", error);
    }  
}

