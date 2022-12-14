import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Comment from './components/comment';
export default function Blogpage() {

    //useParams allows us to grab url params
    const id = useParams().blogId;
    const [blog, setBlog] = useState([]);
    const [comments, setComments] = useState([]);

    const [isEdit, setIsEdit] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [errorMsg, setErrorMsg] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);

    // Using reverse method to show most recent comment at top aka end of array
    useEffect(() => {
        Promise.all([
            fetch(`http://localhost:3000/posts/${id}`)
                .then(res => res.json()),
            fetch(`http://localhost:3000/posts/${id}/comments`)
                .then(res => res.json())
        ]).then(data => {
            setBlog(data[0].post);
            setComments(data[1].comments.reverse());
        })
    }, [])

    const deleteBlog = () => {
        axios({
            method: "DELETE",
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            },
            url: `http://localhost:3000/posts/${id}`
        }).then(() => {
            setErrorMsg(false);
            setSuccessMsg(true);
        }, (err) => setErrorMsg(true))
    }

    const startEdit = () => {
        setIsEdit(prevState => !prevState);
    }
    const sendEditBlog = () => {
        axios({
            method: "PUT",
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            },
            data: {
                title: title,
                description: description
            },
            url: `http://localhost:3000/posts/${id}`
        }).then(res => {
            setIsEdit(false);
            setBlog(prevState => {
                prevState.title = title;
                prevState.body = description;
                return prevState;
            })
        }, (err) => console.log(err));
    }

    const commentElements = comments.map(comment => {
        return <Comment
            comment={comment.comment}
            username={comment.username}
            timestamp={comment.timestamp}
            key={comment._id}
            id={comment._id}
            blogId={id}
        />
    }, [])

    return (
        <div>
            <Link to='/'>Back</Link>
            <button onClick={startEdit}>Edit contents</button>
            {isEdit && <div>
                <input type='text' name='title' placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
                <input type='text' name='description' placeholder='Body' onChange={(e) => setDescription(e.target.value)} />
                <button onClick={sendEditBlog}>Submit Edit</button>
            </div>}
            <div className='flex-column flex-center'>
                {errorMsg && <h2>Server Error</h2>}
                {successMsg && <h2>Successfully deleted</h2>}
                <div className='blog-post padding-all-2'>
                    <button onClick={deleteBlog}>Delete</button>
                    <div className='blog-main'>
                        <h2>{blog.title}</h2>
                        <p>{blog.body}</p>
                        <p>{blog.timestamp}</p>
                    </div>
                    <div className='flex-column flex-center'>
                        <div>{commentElements}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}