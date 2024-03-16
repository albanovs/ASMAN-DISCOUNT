import React from 'react'
import './header.css'
import { MdAccountCircle } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { BiDotsVerticalRounded } from "react-icons/bi";

export default function Header() {
    return (
        <div className='contain-header'>
            <div className="header">
                <div className='profile-name'>
                    <MdAccountCircle size={40} />
                    <h1>Таласбек</h1>
                </div>
                <div style={{display: 'flex', gap:'10px'}}>
                    <IoNotifications size={25} color='#E2A332' />
                    <BiDotsVerticalRounded size={25} color='white'/>
                </div>
            </div>
        </div>
    )
}
