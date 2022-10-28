import React from "react";
import { useAppContext } from "store";
import { Alert } from "antd";
import useAxios from 'axios-hooks'
import Post from './Post';



function PostList() {
    const { store: { jwtToken } } = useAppContext();

    const headers = { Authorization: `Bearer ${jwtToken}` };
    const [{data: postList, loading, error}, refetch] = useAxios({
        url: "http://127.0.0.1:8000/api/posts/",
        headers,
    });



    return (
        <div>
            {postList && postList.length === 0 &&
                <Alert type="warning" message="There are no postings!" />}
            {postList && postList.map(post => {
                return <Post post={post} key={post.id}/>
            })}
        </div>
    );
}

export default PostList;

