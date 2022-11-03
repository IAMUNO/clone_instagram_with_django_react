import React, { useEffect, useState } from "react";
import Post from './Post';
import { Alert } from "antd";
import { axiosInstance, useAxios } from 'api';
import { useAppContext } from "store";


function PostList() {
    const { store: { jwtToken } } = useAppContext();

    const headers = { Authorization: `Bearer ${jwtToken}` };

    const [postList, setPostList] = useState([]);

    const [{data: originPostList, loading, error}, refetch] = useAxios({
        url: "/api/posts/",
        headers
    });

    useEffect(() => {
        setPostList(originPostList);
    }, [originPostList]);

    const handleLike = async ({  post, is_like }) => {
        const apiUrl = `/api/posts/${post.id}/like/`;
        const method = is_like ? 'POST' : 'DELETE';

        try {
            const response = await axiosInstance({
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

