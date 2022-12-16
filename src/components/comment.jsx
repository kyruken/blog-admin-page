import React from 'react';
import axios from 'axios';

export default function Comment(props) {
    const deleteComment = () => {
        axios({
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
            },
            url: `http://localhost:3000/posts/${props.blogId}/comments/${props.id}`
        }).then(res => console.log(res));
    }
    
    return (
        <div className='comment padding-all-2 margin-bottom-1'>
            <div className='flex-row jc-space-between padding-bottom-1'>
                <p className='bold font-size-2'>{props.username}</p>
                <p>{props.timestamp}</p>
            </div>
            <p>{props.comment}</p>
            <div>
                <button onClick={deleteComment}>Delete</button>
                <button>Edit</button>
            </div>
        </div>
    )
}