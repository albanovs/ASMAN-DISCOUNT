import React, { useState } from 'react'
import './sign-up.css'
import coin from '../covers/coin.png'
import { NavLink } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignUp() {

    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    return (
        <div>
            <div className='container2'>
                <div className='images2'>
                    <div className='coin2'>
                        <img src={coin} alt="" />
                    </div>
                    <form onSubmit="" className='submit2'>
                        <h1>Регистрация</h1>
                        <div className='inputs2'>
                            <input type="email" placeholder='email' />
                            <input type="text" placeholder='ваше имя' />
                            <div className='password2'>
                                <input maxLength='20' type={visible ? "text" : "password"} placeholder='Пароль' />
                                <span className="span-icon2" onClick={() => setVisible(!visible)}>
                                    {visible ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                            <div className='password2'>
                                <input maxLength='20' type={visible2 ? "text" : "password"} placeholder='Повторите пароль' />
                                <span className="span-icon2" onClick={() => setVisible2(!visible2)}>
                                    {visible2 ? <FaEye /> : <FaEyeSlash />}
                                </span>
                                <p className='error-text2'>* пароли не совпадают</p> 
                            </div>
                            <NavLink className="link2">Забыли пароль ?</NavLink>
                            <button className='sign-up2'>Далее</button>
                        </div>
                    </form>
                    <p className='footer-text2'>Есть аккаунт ? <NavLink className="register2">войдите</NavLink></p>
                </div>

            </div>
        </div>
    )
}