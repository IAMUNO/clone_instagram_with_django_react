import React, { useEffect, useState } from 'react';
import Suggestion from "./Suggestion";
import { Button, Card } from 'antd';
import { axiosInstance, useAxios } from 'api';
import { useAppContext } from "store";
import "./SuggestionList.scss";


export default function SuggestionList({ style }) {
    const { store: { jwtToken } } = useAppContext();
    const headers = { Authorization: `Bearer ${jwtToken}` };
    const [{data: originUserList, loading, error}, refetch] = useAxios({
        url: "/accounts/suggestions/",
        headers,
    });

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        if ( !originUserList )
            setUserList([]);
        else
            setUserList(originUserList.map(user => ({ ...user, is_follow: false })))
    }, [originUserList]);

    const onFollowUser = username => {
        const data = { username };
        const config = { headers };
        axiosInstance.post("/accounts/follow/", data, config)
            .then(response => {
                setUserList(prevUserList =>
                    prevUserList.map( user =>
                         user.username !== username  ? user : { ...user, is_follow: true }
                    )
                );
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div style={style}>
            {loading && <div>Loading...</div>}
            {error && <div>Error Occurred!!!</div>}

            <Button style={{ marginBottom: "1em"  }} onClick={() => refetch()}>Reload</Button>

            <Card title="Suggestions for you" size="small">
                {userList.map(suggestionUser =>
                    <Suggestion
                        key={suggestionUser.username}
                        suggestionUser={suggestionUser}
                        onFollowUser={onFollowUser}
                    />
                    )}
            </Card>
        </div>
    );
}




