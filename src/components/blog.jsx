import { useState } from 'react';

export default function Blog(props) {
    const [isPublished, setIsPublished] = useState(props.isPublished);

    const handleClick = () => {
        setIsPublished(prevState => !prevState);
    }
    
    return (
        <div className="blog padding-all-1" onClick={props.handleClick}>
            <h3>{props.title}</h3>
            <p>{props.body}</p>
            <p>{props.timestamp}</p>
            <button onClick={handleClick}>{isPublished ? "Published" : "Not Published"}</button>
        </div>
    )
}