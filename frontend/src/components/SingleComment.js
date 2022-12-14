import React from 'react';
import { Avatar, Tooltip, Comment as AntdComment } from "antd";
import moment from "moment";


export default function SingleComment({comment}) {
    const {
        author: { username, name, avatar_url },
        message,
        created_at
    } = comment;

    const displayName = name.length === 0 ? username : name;



    return (
        <div>
           <AntdComment
                author={displayName}
                avatar={
                    <Avatar
                        src={ avatar_url }
                        alt={displayName}
                    />

                }
                content={
                    <p>{message}</p>
                }
                datetime={
                    <Tooltip title={moment().format(created_at)}>
                        <span>{moment(created_at).fromNow()}</span>
                    </Tooltip>
                }
            />
        </div>
    );
}