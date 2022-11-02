import React from 'react';
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import AppLayout from 'components/AppLayout';
import PostList from "components/PostList";
import StoryList from "components/StoryList";
import SuggestionList from "components/SuggestionList";

function Home() {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/post/new");
    }
    const sidebar = (
        <>
            <Button
                type="primary"
                block
                style={{ marginBottom: "2rem" }}
                onClick={handleClick}
            >
                New Post
            </Button>
            <StoryList style={{ marginBottom: "1rem" }} />
            <SuggestionList style={{ marginBottom: "1rem" }} />
        </>
    );

    return (
        <AppLayout sidebar={sidebar}>
            <PostList />
        </AppLayout>
    );
}

export default Home;