import React from 'react';
import { Avatar, Card, Comment, Tooltip } from 'antd';
import { HeartTwoTone, HeartOutlined, UserOutlined } from '@ant-design/icons';
import { useAppContext } from "store";
import Axios from 'axios';
import moment from "moment";
import useAxios from 'axios-hooks';



function Post({ post, handleLike }) {
    const { store: { jwtToken } } = useAppContext();
    const headers = { Authorization: `Bearer ${jwtToken}` };

    const [{data: commentList, loading, error}, refetch] = useAxios({
        url: `http://127.0.0.1:8000/api/posts/${post.id}/comments/`,
        headers
    });

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
                                  src={`http://127.0.0.1:8000` + avatar_url}
                                  alt={username}
                                />
                            }
                        />
                    }
                    title={location}
                    description={caption}
                />

                <h2>Comment List</h2>

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

            </Card>
        </div>
    );
}

export default Post;