import Blog from './components/blog';
import { useState, useEffect } from 'react';

import './App.css';

function Homepage(props) {
    const [blogs, setBlogs] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:3000/posts')
            .then(response => response.json())
            .then(data => setBlogs(data.posts));

    }, [])

    const blogElements = blogs.map(blog => {
        return <Blog
            body={blog.body}
            comments={blog.comments}
            isPublished={blog.isPublished}
            title={blog.title}
            key={blog._id}
            id={blog._id}
        >
        </Blog>
    })

    return (
        <div className="App">
            <h1>Ibrablogs Admin Dashboard</h1>
            <div>
                <input type='text' name='title' placeholder='Title'/>
                <input type='text' name='body' placeholder='Body' />
                <button>Submit Post</button>
            </div>
            <div className="grid grid-center blog-container padding-lr-5 padding-tb-1">{blogElements}</div>
        </div>
    )
}

export default Homepage
