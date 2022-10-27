import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import Axios from "axios";
import Suggestion from "./Suggestion";
import { useAppContext } from "store";
import "./SuggestionList.scss";


export default function SuggestionList({ style }) {
    const [userList, setUserList] = useState( [] );
    const { store: { jwtToken } } = useAppContext();

    useEffect(() => {
        async function fetchUserList() {
            const apiUrl = "http://127.0.0.1:8000/accounts/suggestions/";
            const headers = { Authorization: `Bearer ${jwtToken}` };
            try {
                const { data } = await Axios.get(apiUrl, { headers });
                setUserList(data);
            }
            catch(error) {
                console.error(error);
            }
        }
        fetchUserList();
    }, []);

    return (
        <div style={style}>
            <Card title="SuggestionList for you" size="small">
                {userList.map(suggestionUser =>
                    <Suggestion key={suggestionUser.username} suggestionUser={suggestionUser} />
                )}
            </Card>
        </div>
    );
}




