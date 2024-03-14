import React, { useState } from 'react'
import './sign-in.css'
import coin from '../covers/coin.png'
import { NavLink } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignIn() {

    const [visible, setVisible] = useState(false)
    return (
        <div>
            <div className='container'>
                <div className='images'>
                    <div className='coin'>
                        <img src={coin} alt="" />
                    </div>
                    <form onSubmit="">
                        <div className='submit'>
                            <h1>Вход</h1>
                            <div className='inputs'>
                                <input type="email" placeholder='email' />
                                <div className='password'>
                                    <input maxLength='20' type={visible ? "text" : "password"} placeholder='Пароль' />
                                    <span className="span-icon" onClick={() => setVisible(!visible)}>
                                        {visible ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </div>
                                <NavLink className="link">Забыли пароль ?</NavLink>
                                <button className='sign-in'>Войти</button>
                            </div>
                        </div>
                    </form>
                    <p className='footer-text'>нет аккаунта ? <NavLink className="register">зарегистрируйтесь</NavLink></p>
                </div>

            </div>
        </div>
    )
}
