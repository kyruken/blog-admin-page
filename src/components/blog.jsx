import React from 'react';

export default function Blog(props) {
    return (
        <div className="blog padding-all-1" onClick={props.handleClick}>
            <h3>{props.title}</h3>
            <p>{props.body}</p>
            <p>{props.timestamp}</p>
        </div>
    )
}