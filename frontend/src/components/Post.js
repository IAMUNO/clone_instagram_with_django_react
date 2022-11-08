import React, { useState } from 'react';
import { Avatar, Card, Button, Modal } from 'antd';
import { HeartTwoTone, HeartOutlined, UserOutlined } from '@ant-design/icons';
import { useAppContext } from "store";
import CommentList from "./CommentList";

function Post({ post, handleLike }) {
    const { author, caption, location, photo, tag_set, is_like } = post;
    const { username, name, avatar_url } = author;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => { setIsModalOpen(true) };
    const handleOk = () => { setIsModalOpen(false) };
    const handleCancel = () => { setIsModalOpen(false) };

    return (
        <div className="post">
            <Card
                hoverable
                cover={ <img src={photo} alt={caption} onClick={showModal} /> }
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
                                  src={ avatar_url }
                                  alt={username}
                                />
                            }
                        />
                    }
                    title={location}
                    description={caption}
                    style={{ marginBottom: "1em" }}
                />
                <CommentList post={post} />
            </Card>

            <Modal footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800}>
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
                                      src={ avatar_url }
                                      alt={username}
                                    />
                                }
                            />
                        }
                        title={location}
                        description={caption}
                        style={{ marginBottom: "1em" }}
                    />
                    <CommentList post={post} />
                </Card>

            </Modal>

        </div>
    );
}

export default Post;