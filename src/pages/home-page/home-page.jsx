import React, { useEffect } from 'react'
import './home-page.css'
import Header from '../../containers/header/header'
import Balance from './components/balance/balance'
import { IoQrCodeOutline } from "react-icons/io5";
import { BiScan } from "react-icons/bi";
import { useNavigate } from 'react-router-dom'
import { BsArrowDownLeftCircleFill } from "react-icons/bs";
import { BsArrowDownRightCircleFill } from "react-icons/bs";
import { FaPlayCircle } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserData } from '../../App/slice/user-info';
import { fetchStatusData } from '../../App/slice/status';
import standart from '../../views/status/standart.png'
import bronze from '../../views/status/bronze.png'
import silver from '../../views/status/silver.png'
import gold from '../../views/status/gold.png'
import vip from '../../views/status/vip.png'
import Storis from '../../containers/stories/stories';

export default function HomePage() {

    const userData = useSelector(state => state.user_info.user_info)
    const getStatus = useSelector(state => state.status.status)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUserData())
        dispatch(fetchStatusData())
    }, [dispatch])


    const navigate = useNavigate()
    return (
        <div className='home-page'>
            <Header />
            <Storis />
            <div className='section1'>
                <h1>Ваш статус !</h1>
                <h2 className='status-user'>{userData.status || "загрузка"}</h2>
                <div className='status'>
                    <div className={userData.status == 'Стандарт' ? "active_status" : ""}>
                        <h1>стандарт</h1>
                        <img src={standart} alt="" />
                        <p>{getStatus.standard || 0}</p>
                    </div>
                    <div className={userData.status == 'Бронза' ? "active_status" : ""}>
                        <h1>бронза</h1>
                        <img src={bronze} alt="" />
                        <p>{getStatus.bronze || 0}</p>
                    </div>
                    <div className={userData.status == 'Серебро' ? "active_status" : ""}>
                        <h1>серебро</h1>
                        <img src={silver} alt="" />
                        <p>{getStatus.silver || 0}</p>
                    </div>
                    <div className={userData.status == 'Золото' ? "active_status" : ""}>
                        <h1>золото</h1>
                        <img src={gold} alt="" />
                        <p>{getStatus.gold || 0}</p>
                    </div>
                    <div className={userData.status == 'vip' ? "active_status" : ""}>
                        <h1>VIP</h1>
                        <img src={vip} alt="" />
                        <p>{getStatus.vip || 10000}</p>
                    </div>
                </div>

                <Balance balance={userData.balance} curs={getStatus.rate} />
                <div className='button-payment_contain'>
                    <div className='button-payment_home'>
                        <button onClick={() => navigate('/')}><BsArrowDownLeftCircleFill size={40} /><span>Ввод</span></button>
                        <button onClick={() => navigate('/')}><BsArrowDownRightCircleFill size={40} /><span>Вывод</span></button>
                        <button onClick={() => navigate('/qr-details')}><FaPlayCircle size={40} /><span>Перевод</span></button>
                        <button onClick={() => navigate('/buy-asman')}><FaProductHunt size={40} /><span>Купить</span></button>
                    </div>
                </div>
                <div>
                </div>
                <div className='child-button_qr'>
                    <button className='contain-button_item_qr' onClick={() => navigate('/my-qr')}>Мой QR <IoQrCodeOutline size={40} /></button>
                    <button className='contain-button_item_qr' onClick={() => navigate('/qr-scanner')}>Сканнер <BiScan size={40} /></button>
                </div>
                <div className='referal-contain'>
                    <div>
                        <h1>Реферальная программа</h1>
                    </div>
                </div>
            </div>
        </div >
    )
}