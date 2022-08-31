import { useUserContext } from "../hooks/useUserHook";
import UpdateAddressForm from '../components/UpdateAddressForm';
import { useState } from "react";

const Profile = () => {

    const { username, address } = useUserContext();

    const [ editingAddress, setEditingAddress] = useState(false);

    const toggleEditAddress = (e) => {
        setEditingAddress(!editingAddress);
    }

    return (
        <div className="page-container">
            <div className="profile-page-panel">
                <h1>{username}</h1>
                <p className="delivery-address-title">Delivery Address</p>
                {!editingAddress ?
                    <div className="deliver-address-div">
                        <p>{address && address.split(',')[0] || 'No Address Saved'}</p>
                        <p>{address && address.split(',')[1]}</p>
                        <p>{address && address.split(',')[2]}</p>
                        <p>{address && address.split(',')[3]}</p>
                    </div>
                    : 
                    <UpdateAddressForm />}
                <span className="edit-address-button" onClick={toggleEditAddress}>Edit Address</span>
            </div>
        </div>
    )

}

export default Profile;