import React from 'react'

import './WebcamHeader.css'
const WebcamHeader = (props) => {
    const parkName = props.name;
    
    return (
        <div className='park-info-header'>
            <div className='parkInfo-textDiv'>
                <h1>{parkName}</h1>
            </div>
            
        </div>
    )
}

export default WebcamHeader
