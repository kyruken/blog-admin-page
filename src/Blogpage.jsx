import React from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Comment from './components/comment';
export default function Blogpage() {
    
    //useParams allows us to grab url params
    const id = useParams().blogId;
    const [blog, setBlog] = React.useState([]);
    const [comments, setComments] = React.useState([]);

    // Using reverse method to show most recent comment at top aka end of array
    React.useEffect(() => {
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

    function handleSubmit(e) {
        e.preventDefault();

        const newComment = {
            username: e.target.username.value,
            comment: e.target.comment.value,
            //Assigning new Date() by itself is assigning an object to timestamp
            //Therefore you must make it a string or else you get errors -_-
            timestamp: `${new Date()}`
        }

        //Axios doesn't send data by default as a url-encoded body
        //https://axios-http.com/docs/urlencoded
        //Solution found above ^
        const params = new URLSearchParams();
        params.append('username', e.target.username.value);
        params.append('comment', e.target.comment.value);
        axios.post(`http://localhost:3000/posts/${id}/comments`, params);

        setComments(prevComments => {
            const commentsArray = [newComment, ...prevComments];
            return commentsArray;
        })
    }
    
    return (
        <div>
            <Link to='/'>Back</Link>
            <div className='flex-column flex-center'>
                <div className='blog-post padding-all-2'>
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