import React from 'react';
import { Avatar, Card } from 'antd';
import { HeartTwoTone, HeartOutlined, UserOutlined } from '@ant-design/icons';
import { useAppContext } from "store";
import CommentList from "./CommentList";




function Post({ post, handleLike }) {
    const { author, caption, location, photo, tag_set, is_like } = post;
    const { username, name, avatar_url } = author;



    return (
        <div className="post">
            <Card
                hoverable
                cover={ <img src={photo} alt={caption} /> }
                actions={[
                    is_like ? (
                        <HeartTwoTone
                            twoToneColor="#eb2f96"
                            onClick={() => handleLike({ post, is_like: false })}
                        />
                    ) : (
                        <HeartOutlined
                            onClick={() => handleLike({ post, is_like: true })}
                        />
                    )
                ]}
            >
                <Card.Meta
                    avatar={
                        <Avatar
                            size="large"
                            icon={
                                <img
                                  src={ `http://127.0.0.1:8000` + avatar_url }
                                  alt={username}
                                />
                            }
                        />
                    }
                    title={location}
                    description={caption}
                    style={{ marginBottom: "1em" }}
                />

                <h2>Comment List</h2>

                <CommentList post={post} />

            </Card>
        </div>
    );
}

export default Post;