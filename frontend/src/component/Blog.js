import React, { useState, useEffect } from 'react';
import { useHistory, NavLink } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { IoTrashBin } from 'react-icons/io5';
import { HiPencilAlt } from 'react-icons/hi';

const Blog = () => {
    const [notes, setNotes] = useState([]);
    //console.log(notes);
    const history = useHistory();

    const postBlog = async () => {
        try {
            const res = await fetch('/blog/showblogs', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            setNotes(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (error) {
            history.push('/signin');
        }
    }
    useEffect(() => {
        postBlog();
        // eslint-disable-next-line
    }, []);

    const [input, setInput] = useState({
        author: "",
        btitle: "",
    });

    const hii = (event) => {
        const { name, value } = event.target;
        setInput(prevalue => {
            return {
                ...prevalue,
                [name]: value
            }
        })
    }

    const [input1, setInput1] = useState({
        bcontent: "",
    });

    const hoo = async (event) => {
        const { author, btitle } = input;
        const bcontent = input1.bcontent;
        event.preventDefault();
        //console.log(bcontent)
        try {
            const res = await fetch('/blog', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    author,
                    btitle,
                    bcontent
                })
            });
           // const data1 = await res.json();
            
            if (res.status === 422) {
                const error = new Error(res.error);
                throw error
            }else {
                alert("Blog Published");
            }
            
        } catch (error) {
            alert("Blog Not Published");
        }
        
    }

    const del = async (id) =>{
        console.log(id)
       
        const res = await fetch(`/blog/deleteblog/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        });
        const data2 = await res.json();
       
        if (!data2) {
            console.log("message not send");
        } else {
            alert("Blog Deleted");

        }
        
    }

    return (
        <div className="blogmain">
            <div className="blgmain_1" >
                <h1>Create your Blog</h1>
                <form method="POST">
                    <div className="input1field">
                    <input className="input1" onChange={hii} name="btitle" value={input.btitle} placeholder="Blog Title"></input>
                    <input className="input1" onChange={hii} name="author" value={input.author} placeholder="Blog Author"></input>
                    </div>
                    <div className="... ck-editor__editable ck-editor__editable_inline">
                        <CKEditor
                            editor={ClassicEditor}
                            config={{
                                ckfinder: {
                                    uploadUrl: '/create'
                                }
                            }}
                            data={input1.bcontent}
                            onChange={(e, editor) => {
                                const data = editor.getData();
                                setInput1({ bcontent: data })
                            }}
                        />
                    </div>

                    <button className="blgbtn" onClick={hoo}>Publish</button>
                </form>
            </div>
            <div className="blgmain_2">
                <h2>Your Blogs</h2>
                {notes.map((elem) => {
                    const { _id, author, btitle, bcontent } = elem;
                    return (
                        <div key={_id}>
                            <form method="GET">
                                <div className="homecontent" >
                                    <div className="edit123">
                                    <h1>{btitle}<span>{author}</span></h1>
                                    <div className="edit1234" >
                                    <NavLink to={`/editblg/${_id}`} className="button"><HiPencilAlt  size={32} /></NavLink>
                                    <form method="DELETE" ><IoTrashBin size={32} onClick={()=>{del(_id)}} /></form>
                                    </div>
                                    </div>
                                    <div className="blogcont" dangerouslySetInnerHTML={{ __html: bcontent }} />
                                    <br></br>
                                </div>
                            </form>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}

export default Blog
