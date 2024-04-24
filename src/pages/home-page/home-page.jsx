import React, { useEffect, useState } from 'react'
import './home-page.css'
import Header from '../../containers/header/header'
import Balance from './components/balance/balance'
import { IoQrCodeOutline } from "react-icons/io5";
import { BiScan } from "react-icons/bi";
import { useNavigate } from 'react-router-dom'
import { BsArrowDownLeftCircleFill } from "react-icons/bs";
import { BsArrowDownRightCircleFill } from "react-icons/bs";
import { FaPlayCircle, FaStar } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import { fetchStatusData } from '../../App/slice/status';
import { fetchUserData } from '../../App/slice/user-info';
import standart from '../../views/disc/one.svg'
import bronze from '../../views/disc/two.svg'
import silver from '../../views/disc/three.svg'
import gold from '../../views/disc/four.svg'
import vip from '../../views/disc/five.svg'
import Storis from '../../containers/stories/stories';
import Skeleton from 'react-loading-skeleton';
import { GiLaurelsTrophy } from "react-icons/gi";
import Modal from '../../containers/UI/Modal/Modal';
import coin from '../../views/coins/coin.png'
import { TbClipboardCopy } from "react-icons/tb";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import asmanLogo from '../../views/coins/asmancoin.png'
import { fetchNotifData } from '../../App/slice/notification';
import { api } from '../../Api';

export default function HomePage() {

    const userData = useSelector(state => state.user_info.user_info)
    const getStatus = useSelector(state => state.status.status)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchNotifData())
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
    const [modal, setModal] = useState(false)
    const [copied, setCopied] = useState(false);
    const [count_user, setCount_user] = useState({})

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };


    const handleShareLink = async () => {
        try {
            await navigator.share({
                title: 'Приглашение в платформу ASMAN DISCOUNT',
                text: `Вас пригласил ${userData.first_name} в платформу ASMAN DISCOUNT. Перейдите по ссылке и зарегистрируйтесь:`,
                url: `https://discount.asman.io/#/register/${userData.id}`
            });
        } catch (error) {
            console.error('Ошибка обмена:', error.message);
        }
    };

    useEffect(() => {
        const getCountUsers = async () => {
            try {
                const response = await api.get('/count-users')
                setCount_user(response.data)
            } catch (error) {
                console.log(error);
            }
        }

        getCountUsers()
    }, [])

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
                <h1>Ваш статус!</h1>
                <h2 className='status-user'>{userData.status || "загрузка"} <GiLaurelsTrophy /> </h2>
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
                <Balance info={getStatus.main_info} balance={userData.balance} curs={getStatus.rate} />
                <div className='button-payment_home'>
                    <button onClick={() => navigate('/vvod-asman')}><BsArrowDownLeftCircleFill size={40} /><span>Ввод</span></button>
                    <button onClick={() => navigate('/drawal-with')}><BsArrowDownRightCircleFill size={40} /><span>Вывод</span></button>
                    <button onClick={() => navigate('/qr-details')}><FaPlayCircle size={40} /><span>Перевод</span></button>
                    <button className='asman_coin_button' onClick={() => navigate('/buy-asman')}><div><img src={asmanLogo} /></div><span>Купить</span></button>
                </div>
                <div>
                </div>
                <div className='child-button_qr'>
                    <button className='contain-button_item_qr' onClick={() => navigate('/my-qr')}>Мой QR <IoQrCodeOutline size={40} /></button>
                    <button className='contain-button_item_qr' onClick={() => navigate('/qr-scanner')}>Сканнер <BiScan size={40} /></button>
                </div>
                <div className='referal-contain'>
                    <div onClick={() => setModal(!modal)}>
                        <h1>Реферальная программа</h1>
                    </div>
                    {modal &&
                        <Modal setIsModalOpen={setModal} color="white">
                            <h1 className='text-referal-home_page_main'>Приглашай друзей <br /> в ASMAN DISCOUNT</h1>
                            <p className='text-referal-home_page'>За каждую покупку Asman Coin, совершенную приглашенным другом, вам будет начисляться 8%</p>
                            <div className='asman-coin-contain'>
                                <img src={coin} alt="" className='asman-coin-referal' />
                                <div>
                                    <h1>ваша персональная ссылка</h1>
                                    <p>{`https://discount.asman.io/#/register/${userData.id}`}</p>
                                    <CopyToClipboard text={`https://discount.asman.io/#/register/${userData.id}`} onCopy={handleCopy}>
                                        <TbClipboardCopy className='button-referal-home_page' size={30} />
                                    </CopyToClipboard>
                                    {copied && <p className='copyed-referal'>Скопирован</p>}
                                </div>
                                <button onClick={handleShareLink}>Пригласить</button>
                                <button style={{ background: '#051937' }} onClick={() => navigate('/referal')}>Узнать больше</button>
                            </div>
                        </Modal>
                    }
                </div>
                <footer className='footer_home_page'>
                    <div>
                        <p>Количество зарегистрированных <br /> пользователей:
                            <h2>{count_user.count} <FaStar color='#e48a21' size={10} /></h2>
                        </p>
                    </div>
                    <div>
                        <p> Последние зарегистрированные пользователи:</p>
                        <ul className='list_count_user'>
                            {
                                count_user.users ? count_user.users.map((el, index) => {
                                    return (
                                        <li key={index}>
                                            <img src={`https://discount.asman.io${el.profile_photo}`} alt="" />
                                            <div>
                                                <span>{el.first_name} </span><span> {el.last_name.split('')[0]} ** ***</span>
                                            </div>
                                        </li>
                                    )
                                }) : ""
                            }
                        </ul>
                    </div>
                </footer>
            </div>
        </div >
    )
}