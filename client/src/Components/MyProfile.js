import React from 'react';


const Profile = () => {
   
    return (
        <div>
            <img src={user.picture} alt="Profile Picture" />

            <h2>Name:{user.name}My name</h2>
            <p>Email:{user.email}My email</p>
            
        </div>
    );
};
export default Profile;
