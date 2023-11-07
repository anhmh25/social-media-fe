import { React, useState, useEffect } from 'react';
import './homePage.scss';
import Comment from '../../components/comment/comment';
import CreatPost from '../../components/creatPost/creatPost';
import { useNavigate } from 'react-router-dom';
import deleteIcon from '../../assets/img-svg/x.svg';
import heart from '../../assets/img-svg/heart.svg';
import heartRed from '../../assets/img-svg/heart-red.svg';
import comment from '../../assets/img-svg/comment.svg';
import chat from '../../assets/img-svg/chat.svg';
import friend from '../../assets/img-svg/friend.svg';
import bookmark from '../../assets/img-svg/bookmark.svg';
import logout from '../../assets/img-svg/logout.svg';
import axios from 'axios';
import { handleAddLikePost, handleDeletePost, handleRemoveLikePost } from '../../api/apiRequest';

const urlApi = process.env.REACT_APP_API_URL;

const HomePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [postData, setPostData] = useState([]);
    const [isCreatPost, setIsCreatPost] = useState(false);
    const [isOpenComment, setIsOpenComment] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Lỗi chuỗi JSON:', error);
            }
        }
    }, []);


    const getPosts = () => {
        try {
            axios.get(`${urlApi}/getAllPosts`).then((res) => {
                setPostData(res.data.reverse());
                setLikedPosts(res.data.map(post => post.likes.length));
            })
        } catch (error) {
            console.log("Lỗi:", error);
        }
    }

    useEffect(() => {
        getPosts();
    }, [])

    const [canClick, setCanClick] = useState(true);

    useEffect(() => {
        if (!canClick) {
            const timeout = setTimeout(() => {
                setCanClick(true);
            }, 300); // chỉ ấn 1 lần mỗi 300 ms

            return () => clearTimeout(timeout);
        }
    }, [canClick]);

    const deletePost = async (item) => {
        if (item.user_id === user._id) {
            const shouldDelete = window.confirm("Bạn có chắc muốn xóa bài viết của mình?");
            if (shouldDelete) {
                const data = {
                    user_id: user._id,
                    post_id: item._id,
                }
                await handleDeletePost(data);
                const updatedData = postData.filter(i => i._id !== item._id);
                setPostData(updatedData);
            }
        } else {
            const shouldDelete = window.confirm("Không thể xóa bài viết của người khác. Bạn có muốn ẩn đi?");
            if (shouldDelete) {
                const updatedData = postData.filter(i => i._id !== item._id);
                setPostData(updatedData);
            }
        }
    }

    const handleLike = (item, postId, index) => {
        const data = {
            post_id: postId,
            user_id: user._id,
        }
        if (canClick) {
            if (item.likes.find((like) => like._id === user._id)) {
                handleRemoveLikePost(data).then(() => {
                    item.likes = item.likes.filter((like) => like._id !== user._id);
                    likedPosts[index] = likedPosts[index] - 1;
                    item.liked = false;

                    const updatedData = postData.map((post) => {
                        if (post._id === postId) {
                            return item;
                        }
                        return post;
                    });
                    setPostData(updatedData);
                })
                    .catch((error) => {
                        console.error("Lỗi khi xóa like:", error);
                    });
            } else {
                handleAddLikePost(data).then(() => {
                    item.likes.push({ _id: user._id });
                    likedPosts[index] = likedPosts[index] + 1;
                    item.liked = true;
                    const updatedData = postData.map((post) => {
                        if (post._id === postId) {
                            return item;
                        }
                        return post;
                    });
                    setPostData(updatedData);
                })
                    .catch((error) => {
                        console.error("Lỗi khi like:", error);
                    });
            }
            setCanClick(false);
        } else {
            alert('Like từ từ thôi!');
        }
    };

    const getTimeAgo = (postTime) => {
        const date = new Date(postTime);
        const currentTime = new Date();
        const timeDiff = currentTime - date;

        const secondsAgo = Math.floor(timeDiff / 1000);
        if (secondsAgo < 60) {
            return `${secondsAgo} giây`;
        }
        const minutesAgo = Math.floor(secondsAgo / 60);
        if (minutesAgo < 60) {
            return `${minutesAgo} phút`;
        }
        const hoursAgo = Math.floor(minutesAgo / 60);
        if (hoursAgo < 24) {
            return `${hoursAgo} giờ`;
        }
        const daysAgo = Math.floor(hoursAgo / 24);
        return `${daysAgo} ngày`;
    }

    const openComment = (index) => {
        console.log(index)
        setIsOpenComment((prevState) => ({
            ...prevState,
            [index]: true,
        }));
    };

    const closeComment = (index) => {
        setIsOpenComment((prevState) => ({
            ...prevState,
            [index]: false,
        }));
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        if (user) {
            setUser(null);
        }
        navigate('/signin');
    }

    return (
        <>
            {user && (
                <div className="home">
                    <div className="sidebar">
                        <div className='logo'>Logo</div>
                        <div className='user'>
                            <div className="username" style={{ background: '#29BACD' }}>
                                <p>{user.username.charAt(0).toUpperCase()}</p>
                            </div>
                            <p style={{ fontWeight: '500', fontSize: '24px' }}>{user.username}</p>
                        </div>
                        <div className='feature'>
                            <div className='chat'>
                                <img style={{ margin: '0 5px' }} src={chat} alt='' />
                                <p style={{ marginLeft: '5%', fontWeight: '500', fontSize: '24px' }}>Trò chuyện</p>
                            </div>
                            <div className='friend'>
                                <img style={{ margin: '0 5px' }} src={friend} alt='' />
                                <p style={{ marginLeft: '5%', fontWeight: '500', fontSize: '24px' }}>Bạn bè</p>
                            </div>
                            <div className='bookmark'>
                                <img style={{ margin: '0 15px' }} src={bookmark} alt='' />
                                <p style={{ marginLeft: '5%', fontWeight: '500', fontSize: '24px' }}>Đã lưu</p>
                            </div>
                            <button className='logout' onClick={handleLogout}>
                                <img style={{ margin: '0 2.5px' }} src={logout} alt='' />
                                <p style={{ marginLeft: '5%', fontWeight: '500', fontSize: '24px' }}>Đăng xuất</p>
                            </button>
                        </div>
                    </div>
                    <div className="content">
                        <div className="box-creat-post">
                            <button className="button-creat-post" onClick={() => setIsCreatPost(true)}>Tạo một bài đăng</button>
                            <CreatPost isOpen={isCreatPost} onClose={() => setIsCreatPost(false)} userId={user._id} userName={user.username} />
                        </div>
                        {/* BOX_CONTENT */}
                        {postData.map((item, index) => (
                            <div key={index} className="box-content">
                                {/* Avatar & NAME */}
                                <div className="box-top">
                                    <div className="user-card">
                                        <div className="avatar" style={{ background: '#29BACD' }}>
                                            <p>{item.user_name.charAt(0).toUpperCase()}</p>
                                        </div>
                                        <div className="name-time">
                                            <p style={{ fontWeight: '600' }}>{item.user_name}</p>
                                            <p style={{ fontSize: '0.8rem', color: '#bebfc0' }}>{getTimeAgo(item.createdAt)}</p>
                                        </div>
                                    </div>
                                    <button className="delete-icon" onClick={() => { deletePost(item) }} title='Ẩn'>
                                        <img src={deleteIcon} alt='' />
                                    </button>
                                </div>
                                {/* CONTENT */}
                                <div className="content">
                                    {item.image_url ? (
                                        <div style={{ backgroundColor: '#29BACD' }}>
                                            <p className="text-content">{item.content}</p>
                                            <img className="img-content" src={item.image_url} alt="Ảnh bài đăng" />
                                        </div>
                                    ) : (
                                        <div className="content-only" style={{ background: '#29BACD' }}>
                                            <p>{item.content}</p>
                                        </div>
                                    )}
                                </div>
                                {/* TYM & COMMENT */}
                                <div className="box-icon">
                                    <button style={{ margin: '10px 20px' }} onClick={() => handleLike(item, item._id, index)}>
                                        {item.likes.find((like) => like._id === user._id) ? (
                                            <img src={heartRed} alt='' />
                                        ) : (
                                            <img src={heart} alt='' />
                                        )}
                                    </button>
                                    <button onClick={() => openComment(index)}>
                                        <img src={comment} alt='' />
                                    </button>
                                    {isOpenComment[index] && <Comment isOpen={isOpenComment[index]} onClose={() => closeComment(index)}
                                        postId={item._id} userId={user._id} userName={user.username} />}
                                </div>
                                <p className="number-like">{likedPosts[index]} lượt thích</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default HomePage