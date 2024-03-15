import React from 'react'
import './header.css'
import { MdAccountCircle } from "react-icons/md";
import { IoNotificationsCircle } from "react-icons/io5";

export default function Header() {
    return (
        <div>
            <div className="header">
                <div className='profile-name'>
                    <MdAccountCircle size={40} />
                    <h1>Таласбек</h1>
                </div>
                <div>
                    <IoNotificationsCircle size={40} color='#E2A332' />
                </div>
            </div>
        </div>
    )
}
