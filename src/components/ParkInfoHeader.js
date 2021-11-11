import React from 'react'
import './ParkInfoHeader.css'


// Div for header 

const ParkInfoHeader = (props) => {

    // Take in props for park name, phone numbers, emails
    const parkName = props.name;
    const phoneNumbers = props.phoneNum;
    const emails = props.emailData

    // display each phone number & type of number in contact div
    const mapPhoneNum = (phone) =>{
        return(
            <div>
                <h5>Number: {phone.phoneNumber}</h5>
                <h5>Type: {phone.type}</h5>
            </div>
        )
    }

    // Method below to display each email in email address array
    const mapEmail = (email) => {
        return(
            <div>
                <h5>Email: {email.emailAddress}</h5>
            </div>                    
            )
    }
    return (
        <div className='park-info-header'>

            {/* Div with park name in bottom left in white text */}
            <div className='parkInfo-textDiv'>
                <h1>{parkName}</h1>
            </div>

            {/* div in top right with contact information */}
            <div className='header-contact'>
                <h3>Contact Info </h3>

                {phoneNumbers.map(mapPhoneNum)}
                {emails.map(mapEmail)}

            </div>

        </div>
    )
}

export default ParkInfoHeader
