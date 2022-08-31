//imports 
import { useUserContext } from "../hooks/useUserHook"
import { useState } from "react";

const UpdateAddressForm = () => {

    // get address and dispatch from user context
    const { user_id, address, token, dispatch } = useUserContext();


    // handler for update address form submission
    const handleAddressChange = async (e) => {

        // prevent refresh
        e.preventDefault();

        // get address input as a string
        let addressArray = e.target.parentNode.childNodes;
        console.log(addressArray)
        let stringAddress = "";

        addressArray.forEach((input) => {
            if(input.value){
                stringAddress += input.value + ','
            }
        })
        console.log(stringAddress);

        // create request object for db update
        const requestObject = {
            user_id, address: stringAddress
        }

        // await update on db side
        await fetch('http://localhost:5000/users/' + user_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestObject)
        })

        // dispatch to update address on user context
        dispatch({ type: 'SET_ADDRESS', payload: stringAddress});

    }



    return (
        <form className="address-form">
            <label htmlFor="house-number">Flat / House number: </label>
            <input id="house-number" type="text" />
            <label htmlFor="street-name">Street Name: </label>
            <input id="street-name" type="text"/>
            <label htmlFor="city">City: </label>
            <input id="city" type="text" />
            <label htmlFor="postcode">Postcode: </label>
            <input id="postcode" type="text" />
            <button onClick={handleAddressChange}>Update Address</button>
        </form>
    )

}

export default UpdateAddressForm;