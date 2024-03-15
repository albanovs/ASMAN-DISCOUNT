import React from 'react'
import './tab-bar.css'
import routes from '../../routers/routes'
import { NavLink, useLocation } from 'react-router-dom'

export default function TabBar() {
    const location = useLocation();

    return (
        <div className='tab-menu'>
            {
                routes.map((route, index) => {
                    return (
                        <NavLink
                            end
                            to={route.path}
                            key={index}
                            className={`tab-element  ${location.pathname === route.path ? "active" : ""}`}
                        >
                            {route.icon}
                            < h1 > {route.name}</h1>
                        </NavLink >
                    )
                })
            }
        </div >
    )
}
