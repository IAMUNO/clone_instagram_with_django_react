import React, { useState } from "react";
import { useAppContext } from "store";
import { Button, Input } from 'antd';
import moment from "moment";
import Axios from 'axios';
import useAxios from 'axios-hooks';
import Comment from "./Comment";


export default function CommentList({ post }) {
    const { store: { jwtToken } } = useAppContext();

    const [commentContent, setCommentContent] = useState("");

    const headers = { Authorization: `Bearer ${jwtToken}` };

    const [{data: commentList, loading, error}, refetch] = useAxios({
        url: `http://127.0.0.1:8000/api/posts/${post.id}/comments/`,
        headers
    });

    const handleCommentSave = async () => {
        const apiUrl = `http://127.0.0.1:8000/api/posts/${post.id}/comments/`


        try {
            const response = await Axios.post(
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
