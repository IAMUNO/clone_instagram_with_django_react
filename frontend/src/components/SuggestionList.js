import React from 'react';
import { Card } from 'antd';
import Suggestion from "./Suggestion";
import "./SuggestionList.scss";

export default function SuggestionList({ style }) {
    return (
        <div style={style}>
            <Card title="SuggestionList for you" size="small">
                <Suggestion />
                <Suggestion />
                <Suggestion />
                <Suggestion />
                <Suggestion />
                <Suggestion />
            </Card>
        </div>
    );
}




