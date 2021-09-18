import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Blgn } from './Editblg';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function EditBlog(props) {
    const a = useContext(Blgn);
    const history = useHistory();
    const [input, setInput] = useState({
        author: a.author,
        btitle: a.btitle,
    });
    //console.log(input)
    const [input1, setInput1] = useState({
        bcontent: a.bcontent
    });
    useEffect(() => {
        setInput(a)
        setInput1(a)
    }, [a]);
    const hii = (event) => {
        const { name, value } = event.target;
        setInput(prevalue => {
            return {
                ...prevalue,
                [name]: value
            }
        })
    }

    const hoo = async (event) => {
        const { author, btitle } = input;
        const bcontent = input1.bcontent
        event.preventDefault();
        console.log(input1.bcontent)
        const res = await fetch(`/blog/updateblog/${a._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                author,
                btitle,
                bcontent
            })
        });
        const data1 = await res.json();
        if (!data1) {
            console.log("message not send");
        } else {
            alert("Blog Updated");
            history.push('/blog');
        }
    }

    return (
        <div className="blogmain">
            <div className="blgmain_1" >
                <h1>Edit your Blog</h1>
                <form method="PUT">
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
                    <button className="blgbtn" onClick={hoo}>Update</button>
                </form>
            </div>
        </div>
    )
}
export default EditBlog
