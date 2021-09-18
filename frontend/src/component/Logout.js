import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom";

const Logout = () => {

    const history = useHistory();
    useEffect(() => {
        fetch('/logout', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            // dispatch({type:"USER", payload:false});
            history.push('/signin', { replace: true });
            if (res.stauts !== 200) {
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err) => {
            console.log(err);
        })
    })
    return (
        <>
            <h1>Logout</h1>
        </>
    )
}

export default Logout
