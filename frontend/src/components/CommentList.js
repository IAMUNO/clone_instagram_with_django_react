import React, { useState } from "react";
import Comment from "./Comment";
import { useAppContext } from "store";
import { Button, Input } from 'antd';
import { axiosInstance, useAxios } from 'api';

export default function CommentList({ post }) {
    const { store: { jwtToken } } = useAppContext();

    const [commentContent, setCommentContent] = useState("");

    const headers = { Authorization: `Bearer ${jwtToken}` };

    const [{data: commentList, loading, error}, refetch] = useAxios({
        url: `/api/posts/${post.id}/comments/`,
        headers
    });

    const handleCommentSave = async () => {
        const apiUrl = `/api/posts/${post.id}/comments/`


        try {
            const response = await axiosInstance.post(
                apiUrl,
                { message: commentContent },
                { headers }
            );
            setCommentContent("");
            refetch();

        }
        catch(error) {
        }
    };

    return (
        <div>
            {commentList && commentList.map(comment => (
                <Comment key={comment.id} comment={comment} />
            ))}


            <Input.TextArea
                style={{ marginBottom: ".5em" }}
                value={commentContent}
                onChange={e => setCommentContent(e.target.value)}
            />
            <Button
                block
                type="primary"
                disabled={commentContent.length === 0}
                onClick={handleCommentSave}
            >
                New Comment
            </Button>

        </div>
    );
}
