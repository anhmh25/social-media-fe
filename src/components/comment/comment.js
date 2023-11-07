import { useCallback, useEffect, useRef, useState } from 'react';
import './comment.scss';
import deleteIcon from '../../assets/img-svg/x.svg';
import send from '../../assets/img-svg/send.svg';
import sendDisable from '../../assets/img-svg/sendDisable.svg';
import axios from 'axios';
import { handleCreatComment } from '../../api/apiRequest';

const urlApi = process.env.REACT_APP_API_URL;

const Comment = ({ isOpen, onClose, postId, userId, userName }) => {
    const [commentData, setCommentData] = useState([]);
    const [textComment, setTextComment] = useState('');
    const [disabledOnchange, setDisableOnchange] = useState(false);
    const commentInputRef = useRef();

    const getComments = useCallback(() => {
        try {
            axios.get(`${urlApi}/getAllComment`, {
                params: {
                    post_id: postId
                }
            }).then((res) => {
                setCommentData(res.data.reverse());
            })
        } catch (error) {
            console.log("Lỗi:", error);
        }
    }, [postId])

    useEffect(() => {
        getComments();
    }, [getComments])

    const handleBoxClick = (e) => {
        e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài `comment-box`
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

    const handleTextCommentChange = (e) => {
        !disabledOnchange && setTextComment(e.target.value);
        disabledOnchange && setDisableOnchange(false);
    };

    const handleComment = async () => {
        const data = {
            post_id: postId,
            user_id: userId,
            user_name: userName,
            contentCmt: textComment,
        }
        setTextComment("");
        await handleCreatComment(data);
    }

    const handleSubmit = async() => {
        setDisableOnchange(true);
        await handleComment();
        getComments();
        commentInputRef.current.focus();
    }

    const handleEnter = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.stopPropagation();
            handleSubmit();
        }
    }

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div className="backdrop" onClick={onClose}>
                <div className="comment-box" onClick={handleBoxClick} >
                    <div className="title">
                        <p className="text">Bình luận</p>
                        <button className="delete-button" onClick={onClose}>
                            <img src={deleteIcon} alt='' />
                        </button>
                    </div>
                    <div className="comments">
                        {commentData?.map((item, index) => (
                            <div key={index} className="a-comment">
                                <div className="avatar" style={{ background: '#29BACD' }}>
                                    <p>{item.user_name.charAt(0).toUpperCase()}</p>
                                </div>
                                <div className="box-content-comment">
                                    <div className="content-comment">
                                        <div className="name">
                                            <p>{item.user_name}</p>
                                        </div>
                                        <div className="comment">
                                            <p>{item.contentCmt}</p>
                                        </div>
                                    </div>
                                    <div className="time">
                                        <p>{getTimeAgo(item.createdAt)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='input-comment'>
                        <div className='avatar'>
                            <p>{userName.charAt(0).toUpperCase()}</p>
                        </div>
                        <div className='box-input'>
                            <textarea ref={commentInputRef} type='text' value={textComment} autoFocus placeholder='Viết bình luận...' onChange={handleTextCommentChange} onKeyDown={handleEnter} />
                            <button onClick={handleSubmit} disabled={!textComment?.trim()}>
                                {textComment ? (
                                    <img src={send} alt='' />
                                ) : (
                                    <img src={sendDisable} alt='' />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Comment;