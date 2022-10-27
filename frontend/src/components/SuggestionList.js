import React, { useState, useEffect } from 'react';
import { Button, Card } from 'antd';
import useAxios from 'axios-hooks'
import Suggestion from "./Suggestion";
import { useAppContext } from "store";
import "./SuggestionList.scss";


export default function SuggestionList({ style }) {
    const { store: { jwtToken } } = useAppContext();

    const headers = { Authorization: `Bearer ${jwtToken}` };

    const [{data: userList, loading, error}, refetch] = useAxios({
        url: "http://127.0.0.1:8000/accounts/suggestions/",
        headers,
    });

    return (
        <div style={style}>
            {loading && <div>Loading...</div>}
            {error && <div>Error Occurred!!!</div>}

            <Button onClick={() => refetch()}>Reload</Button>

            <Card title="Suggestions for you" size="small">
                {userList &&
                    userList.map(suggestionUser =>
                    <Suggestion
                        key={suggestionUser.username}
                        suggestionUser={suggestionUser}
                    />
                    )}
            </Card>
        </div>
    );
}




