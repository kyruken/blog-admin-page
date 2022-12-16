import { useState } from 'react';
import axios from 'axios';

export default function Blog(props) {
    const [isPublished, setIsPublished] = useState(props.isPublished);

    const publishBlog = (e) => {
        //e.preventDefault stops the Link component's onClick event
        e.preventDefault();
        axios({
            method: "PUT",
            headers: {
              Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
            },
            data: {
              isPublished: !isPublished,
            },
            url: `http://localhost:3000/posts/${props.id}`
          }).then(setIsPublished(prevState => !prevState));
        }

    return (
        <div className="blog padding-all-1">
            <h3>{props.title}</h3>
            <p>{props.body}</p>
            <p>{props.timestamp}</p>
            <button onClick={(e) => publishBlog(e)}>{isPublished ? "Published" : "Not Published"}</button>
        </div>
    )
}