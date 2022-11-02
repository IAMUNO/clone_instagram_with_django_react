import React, { useEffect, useState } from "react";
import { useAppContext } from "store";
import { Alert } from "antd";
import Axios from "axios";
import useAxios from 'axios-hooks';
import Post from './Post';



function PostList() {
    const { store: { jwtToken } } = useAppContext();

    const headers = { Authorization: `Bearer ${jwtToken}` };

    const [postList, setPostList] = useState([]);

    const [{data: originPostList, loading, error}, refetch] = useAxios({
        url: "http://127.0.0.1:8000/api/posts/",
        headers
    });

    useEffect(() => {
        setPostList(originPostList);
    }, [originPostList]);

    const handleLike = async ({  post, is_like }) => {
        const apiUrl = `http://127.0.0.1:8000/api/posts/${post.id}/like/`;
        const method = is_like ? 'POST' : 'DELETE';

        try {
            const response = await Axios({
                url: apiUrl,
                method,
                headers,
            });
            console.log("response", response);

            setPostList(prevList => {
                return prevList.map(currentPost =>
                    currentPost === post ? {...currentPost, is_like:is_like} : currentPost )
            });
        }
        catch(error) {
            console.log("error", error);
        }

    };


    return (
        <div>
            {postList && postList.length === 0 &&
                <Alert type="warning" message="There are no postings!" /> }
            {postList && postList.map(post => {
                return <Post post={post} key={post.id} handleLike={handleLike} />
            })}
        </div>
    );
}

export default PostList;

