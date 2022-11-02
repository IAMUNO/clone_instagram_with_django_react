import React from "react";
import { useAppContext } from "store";
import { Avatar, Comment, Tooltip } from 'antd';
import moment from "moment";
import Axios from 'axios';
import useAxios from 'axios-hooks';


export default function CommentList({ post }) {
    const { store: { jwtToken } } = useAppContext();

    const headers = { Authorization: `Bearer ${jwtToken}` };

    const [{data: commentList, loading, error}, refetch] = useAxios({
        url: `http://127.0.0.1:8000/api/posts/${post.id}/comments/`,
        headers
    });


    return (
        <div>
            <Comment
                author={"Yunho Yoo"}
                avatar={
                    <Avatar
                        src="https://joeschmoe.io/api/v1/random"
                        alt="Han Solo"
                    />
                }
                content={
                    <p>comment content</p>
                }
                datetime={
                    <Tooltip title="2016-11-22 11:22:33">
                        <span>8 hours ago</span>
                    </Tooltip>
                }
            />

                        <Comment
                author={"Yunho Yoo"}
                avatar={
                    <Avatar
                        src="https://joeschmoe.io/api/v1/random"
                        alt="Han Solo"
                    />
                }
                content={
                    <p>comment content</p>
                }
                datetime={
                    <Tooltip title="2016-11-22 11:22:33">
                        <span>8 hours ago</span>
                    </Tooltip>
                }
            />

        </div>
    );
}
