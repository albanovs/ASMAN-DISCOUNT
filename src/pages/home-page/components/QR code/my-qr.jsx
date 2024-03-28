import React, { useEffect } from 'react'
import './my-qr.css'
import { FiChevronLeft } from "react-icons/fi";
import { CiShare2 } from "react-icons/ci";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../../../App/slice/user-info';
export default function MyQRcode() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const user_qr = useSelector(state => state.user_info.user_info)

    useEffect(() => {
        dispatch(fetchUserData())
    }, [dispatch])
    return (
        <div className='container-qr'>
            <div><FiChevronLeft onClick={() => navigate(-1)} size={40} /></div>
            <div className='container-qr-block'>
                <h1>Мой QR код</h1>
                <p>Получайте переводы с удобством и безопасностью прямо в приложении</p>
                <div className='qr-block'>
                    <img src={user_qr.qr} alt="" />
                    <h1>{user_qr.id}</h1>
                </div>
                <button className='share-button-qr'><CiShare2 />Поделиться</button>
            </div>
        </div>
    )
}