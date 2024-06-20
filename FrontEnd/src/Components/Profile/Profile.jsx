import React from 'react'
import SideMenu from '../Common/SideMenu/SideMenu'
import './Profile.css'



const Profile = () => {

    const userData = JSON.parse(sessionStorage.getItem('user'));



    return (
        <>
        <SideMenu />
            <div className="wrapper">
                <div className="user-card">
                    <div className="user-card-img">
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjxivAs4UknzmDfLBXGMxQkayiZDhR2ftB4jcIV7LEnIEStiUyMygioZnbLXCAND-I_xWQpVp0jv-dv9NVNbuKn4sNpXYtLIJk2-IOdWQNpC2Ldapnljifu0pnQqAWU848Ja4lT9ugQex-nwECEh3a96GXwiRXlnGEE6FFF_tKm66IGe3fzmLaVIoNL/s1600/img_avatar.png" alt="" />
                    </div>
                    <div className="user-card-info">
                    <h2>{userData.username}</h2>
                        <p><span>Email:</span> {userData.email}</p>
                        <p><span>Phone:</span> {userData.mobileNumber}</p>
                        <p><span>Company:</span> {userData.companyName}</p>
                        <p><span>Role:</span> {userData.role}</p>
                        <p><span>UserId:</span> {userData.userid}</p>
                        <p><span>Status:</span> {userData.status}</p>


                    </div>
                </div>
            </div>
        </>

    )
}

export default Profile