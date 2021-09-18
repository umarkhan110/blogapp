import React, { useState, useEffect, createContext } from 'react'
import { useParams } from 'react-router-dom';
import EditBlog from './EditBlog';

const Blgn = createContext();
const Editblg = () => {
    const { id } = useParams();
    // console.log(id)
    const [edit, setEdit] = useState({});
    //console.log(edit);
    const editBlog = async () => {
        try {
            const res = await fetch(`/blog/edit/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
           setEdit(data);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (error) {
            //console.log(error);
        }
    }
    useEffect(() => {
        editBlog();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <Blgn.Provider value={edit}>
                <EditBlog hnb={edit} />
            </Blgn.Provider>
        </div>
    )
}

export default Editblg
export { Blgn };

