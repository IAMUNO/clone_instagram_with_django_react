import React from "react";
import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./Suggestion.scss";


export default function Suggestion ({ suggestionUser, onFollowUser }) {
    const { username, name, avatar_url, is_follow } = suggestionUser;
    return (
        <div className="suggestion">
            <div className="avatar">
                <Avatar icon={
                    <img
                        size="small"
                        src={ avatar_url }
                        alt={ `${username}'s avatar` }
                    />
                } />
            </div>

            <div className="username">
                {name.length === 0 ? username : name}
            </div>

            <div className="action">
                {is_follow && "following"}
                {!is_follow && (
                    <Button size="small" onClick={() => onFollowUser(username)}>
                        follow
                    </Button>
                )}
            </div>

        </div>

    );
}
