import React, { useEffect, useState } from 'react'
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
import standart from '../../views/disc/one.svg'
import bronze from '../../views/disc/two.svg'
import silver from '../../views/disc/three.svg'
import gold from '../../views/disc/four.svg'
import vip from '../../views/disc/five.svg'
import Storis from '../../containers/stories/stories';
import Skeleton from 'react-loading-skeleton';

export default function HomePage() {

    const userData = useSelector(state => state.user_info.user_info)
    const getStatus = useSelector(state => state.status.status)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUserData())
        dispatch(fetchStatusData())
    }, [dispatch])

    const statuses = [
        { name: 'Стандарт', image: standart, value: getStatus.standard || 0 },
        { name: 'Бронза', image: bronze, value: getStatus.bronze || 0 },
        { name: 'Серебро', image: silver, value: getStatus.silver || 0 },
        { name: 'Золото', image: gold, value: getStatus.gold || 0 },
        { name: 'VIP', image: vip, value: getStatus.vip || 0 }
    ];

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userData && Object.keys(userData).length > 0 && getStatus && Object.keys(getStatus).length > 0) {
            setLoading(false);
        }
    }, [userData, getStatus]);

    const navigate = useNavigate()
    return (
        <div className='home-page'>
            <Header />
            <Storis />
            <div className='section1'>
                <h1>Ваш статус !</h1>
                <h2 className='status-user'>{userData.status || "загрузка"}</h2>
                <div className='status'>
                    {loading ? (
                        <ul className='skeleton-status'>
                            {[...Array(5)].map((_, index) => (
                                <div key={index}>
                                    <Skeleton width={20} height={5} />
                                    <Skeleton width={30} height={30} />
                                    <Skeleton width={20} height={5} />
                                </div>
                            ))}
                        </ul>
                    ) : (
                        statuses.map((status, index) => (
                            <div key={index} className={userData.status === status.name ? "active_status" : ""}>
                                <h1>
                                    <span>{status.name}</span>
                                    <img src={status.image} alt="" />
                                </h1>
                                <p>{status.value}</p>
                            </div>
                        ))
                    )}
                </div>

                <Balance balance={userData.balance} curs={getStatus.rate} />
                <div className='button-payment_contain'>
                    <div className='button-payment_home'>
                        <button onClick={() => navigate('/')}><BsArrowDownLeftCircleFill size={40} /><span>Ввод</span></button>
                        <button onClick={() => navigate('/drawal-with')}><BsArrowDownRightCircleFill size={40} /><span>Вывод</span></button>
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