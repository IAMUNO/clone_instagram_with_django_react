import React, { useEffect, useState } from "react";
import { useAppContext } from "store";
import Axios from "axios";
import Post from './Post';



const apiUrl = "http://127.0.0.1:8000/api/posts/";

function PostList() {
    const { store: { jwtToken }, dispatch } = useAppContext();

    const [postList, setPostList] = useState([]);

    useEffect(() => {
        Axios.get(apiUrl)

            .then(response => {
                const { data } = response;
                setPostList(data);
                console.log("loaded response : ", response);
            })

            .catch(error => {
                // error.response;
            });
    }, []);

    return (
        <div>
            {postList.map(post => {
                return <Post post={post} key={post.id}/>
            })}
        </div>
    );
}

export default PostList;