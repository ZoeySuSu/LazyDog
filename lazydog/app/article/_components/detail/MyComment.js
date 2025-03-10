"use client";

import React, { useState, useEffect } from "react";
import useComment from "@/hooks/useComment";
import styles from '../../_components/detail/page.module.css';
import { useAuth } from "@/hooks/use-auth";
import { useParams } from "next/navigation";
import style from '../../../../styles/modules/operatorCamera.module.css';
import Swal from "sweetalert2";

const CommentSection = () => {
    const [commentContent, setCommentContent] = useState("");
    const { createComment, loading, error, data } = useComment();
    const { id } = useParams();
    const { user, loading: authLoading, } = useAuth();

    if (authLoading) {
        return <div>加載中...</div>;
    }
    
    if (!user) {
        return <p className="text-muted">請先登入以發表評論</p>;
    }
    

    // 設置默認頭像
    const defaultAvatar = '/path/to/default-avatar.jpg';
    // const modifiedAvatar = user?.avatar ? user.avatar.replace('/images/', '/') : defaultAvatar;
    const modifiedAvatar = user?.avatar ? user.avatar.replace('/images/', '/') :'';
    // const modifiedAvatar = user.avatar 
    // console.log(defaultAvatar)
    // console.log(modifiedAvatar)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!commentContent.trim()) {
            Swal.fire("請輸入留言內容");
            return;
        }

        try {
            const commentData = {
                content: commentContent,
                article_id: id,
                user_id: user.id
            };
            await createComment(commentData);
            Swal.fire("留言成功");
            window.location.reload();
            setCommentContent("");
        } catch (err) {
            console.error("留言創建失敗:", err);
            Swal.fire("留言創建失敗");
        }
    };

    if (authLoading) {
        return <div>加載中...</div>;
    }

    return (
        <li className="d-flex py-3" style={{ margin: "10px" }}>
            <div className={`${styles.auther}`}>
                <div className="avatar ratio ratio-1x1 rounded-circle overflow-hidden">
                    <img
                        className="object-fit-cover"
                        src={modifiedAvatar}
                        alt=""
                    />
                </div>
                <div className="d-flex justify-content-center">
                    <div style={{ color: '#66c5bd', fontWeight: 'bold' }}>{user.name}</div>
                </div>
            </div>
            <div className="w-100 d-flex" style={{ height: "40px" }}>
                <textarea
                    type="text"
                    style={{ marginLeft: "2rem", width: "100%", borderRadius: '5px' }}
                    placeholder="輸入留言..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                />
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`btn ms-1 ${style.btn}`}
                >
                    <i className="bi bi-send-fill"></i>
                </button>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {data && <p style={{ color: "green" }}>{data.message}</p>}
        </li>
    );
};

export default CommentSection;