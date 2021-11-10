import React from 'react'
import './ParkInfoHeader.css'
const ParkInfoHeader = (props) => {
    const parkName = props.name;
    const phoneNumbers = props.phoneNum;
    const emails = props.emailData

    const mapPhoneNum = (phone) =>{
        return(
            <div>
                <h5>Number: {phone.phoneNumber}</h5>
                <h5>Type: {phone.type}</h5>
            </div>
        )
    }
    return (
        <div className='park-info-header'>
            <div className='parkInfo-textDiv'>
                <h1>{parkName}</h1>
            </div>
            <div className='header-contact'>
                <h3>Contact Info </h3>
                {phoneNumbers.map(mapPhoneNum)}
                {emails.map((email)=>{
                    return(
                        <div>
                            <h5>Email: {email.emailAddress}</h5>
                        </div>                    )
                })}
            </div>
        </div>
    )
}

export default ParkInfoHeader
