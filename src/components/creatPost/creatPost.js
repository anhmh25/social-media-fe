import './creatPost.scss';
import { useState } from 'react';
import { storage } from '../../api/firebase';
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import deleteIcon from '../../assets/img-svg/x.svg';
import uploadIcon from '../../assets/img-svg/upload.svg';
import { handleCreatPost } from '../../api/apiRequest';

const CreatPost = ({ isOpen, onClose, userId, userName }) => {
    const [text, setText] = useState();
    const [image, setImage] = useState();

    const handleEnter = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.stopPropagation();
            handleUpload();
        }
    }

    const handleBoxClick = (e) => {
        e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài `comment-box`
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleImageRemove = (e) => {
        e.preventDefault()
        setImage(null);
    };

    const generateRandomString = () => {
        return [...Array(3)].map(() => Math.random().toString(36)[2]).join('');
    }

    const handleUpload = async () => {
        if (image) {
            const storageRef = ref(storage, `Images/${generateRandomString()}-${image.name}`)
            await uploadBytes(storageRef, image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    const data = {
                        user_id: userId,
                        user_name: userName,
                        content: text,
                        image_url: downloadURL,
                    };
                    handleCreatPost(data);
                    setText('');
                    setImage(null);
                    onClose();
                    window.location.reload();
                })
            })
        } else {
            const data = {
                user_id: userId,
                user_name: userName,
                content: text,
            };
            await handleCreatPost(data);
            setText('');
            setImage(null);
            onClose();
            window.location.reload();
        }
    }

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div className="backdrop" onClick={onClose}>
                <div className="creat-post-box" onClick={handleBoxClick}>
                    <div className="title">
                        <p className="text">Tạo bài đăng</p>
                        <button className="delete-button" onClick={onClose}>
                            <img src={deleteIcon} alt='' />
                        </button>
                    </div>
                    <div className="user">
                        <div className="user-card">
                            <div className="avatar" style={{ background: '#29BACD' }}>
                                <p>{userName.charAt(0).toUpperCase()}</p>
                            </div>
                            <div className="name">
                                <p style={{ fontWeight: '600' }}>{userName}</p>
                            </div>
                        </div>
                    </div>
                    <div className="input-content">
                        <textarea
                            autoFocus
                            placeholder="Nhập nội dung tại đây!"
                            value={text}
                            onChange={handleTextChange}
                            onKeyDown={handleEnter}
                        />
                        {!image && <div className="custom-file-upload">
                            <label htmlFor="file-upload">
                                <img src={uploadIcon} alt="Choose File" style={{ marginTop: '65px', cursor: 'pointer' }} />
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={(e) => { handleImageChange(e) }}
                                style={{ display: 'none' }}
                            />
                        </div>
                        }
                        {image && (
                            <>
                                <button className="remove-img" onClick={(e) => { handleImageRemove(e) }}>
                                    <img src={deleteIcon} alt='' />
                                </button>
                                <img src={URL.createObjectURL(image)} className="img-preview" alt="Ảnh đã chọn" />
                            </>
                        )}
                    </div>
                    <button className="button-submit" disabled={!text} onClick={handleUpload}>Đăng</button>
                </div>
            </div>
        </>
    );
}

export default CreatPost;