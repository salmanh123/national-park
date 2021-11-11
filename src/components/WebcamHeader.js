import React from 'react'
import './WebcamHeader.css'

// Header for webcam page with less data displayed
// than the typical park page.
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
