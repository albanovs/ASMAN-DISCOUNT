import React, { useState, useRef } from 'react';
import './email-code.css';
import { NavLink } from 'react-router-dom';
import coin from '../covers/coin.png';

export default function EmailCode() {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const handleChange = (index, value) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };
    const handlePaste = (e, index) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('Text').trim();
        if (pastedData.length === 6) {
            const newCode = [...code];
            for (let i = 0; i < 6; i++) {
                if (index + i < newCode.length) {
                    newCode[index + i] = pastedData[i];
                }
            }
            setCode(newCode);
        }
    };
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && index > 0 && code[index] === '') {
            inputRefs.current[index - 1].focus();
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Отправляем код:', code.join(''));
    };
    return (
        <div>
            <div className='container3'>
                <div className='images3'>
                    <div className='coin3'>
                        <img src={coin} alt="" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='submit3'>
                            <h1>Мы отправили код на ваш адрес электронной почты. Пожалуйста, проверьте свой адрес электронной почты, и введите код:</h1>
                            <div className='inputs3'>
                                <div className='inputs-1'>
                                    {code.map((digit, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            maxLength="1"
                                            value={digit}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            onPaste={(e) => handlePaste(e, index)}
                                            ref={(ref) => inputRefs.current[index] = ref}
                                        />
                                    ))}
                                </div>
                                <NavLink className="link3">Забыли пароль ?</NavLink>
                                <button className='sign-in3'>Войти</button>
                            </div>
                        </div>
                    </form>
                    <p className='footer-text3'>Есть аккаунт ? <NavLink to={'/'} className="register3">войдите</NavLink></p>
                </div>
            </div>
        </div>
    );
}