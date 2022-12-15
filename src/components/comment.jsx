import React from 'react';

export default function Comment(props) {
    return (
        <div className='comment padding-all-2 margin-bottom-1'>
            <div className='flex-row jc-space-between padding-bottom-1'>
                <p className='bold font-size-2'>{props.username}</p>
                <p>{props.timestamp}</p>
            </div>
            <p>{props.comment}</p>
        </div>
    )
}