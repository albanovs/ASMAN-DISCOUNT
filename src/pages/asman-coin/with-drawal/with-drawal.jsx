import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './with-drawal.css'
import coin from '../../../views/coins/coin.png'
import { IoIosSend } from "react-icons/io";
import { IoQrCode } from "react-icons/io5";
import { FiChevronLeft } from "react-icons/fi";
import { api } from '../../../Api';
import LoadingAnimate from '../../../UI-kit/loading';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserData } from '../../../App/slice/user-info'
import { getProcess } from '../../../App/slice/process'

export default function WithDrawal() {

    const [isID, setIsID] = useState("")
    const user_coin = useSelector(state => state.user_info.user_info)
    const dispatch = useDispatch()
    const [coin_count, setCoinCount] = useState("")
    const [isUser, setIsUser] = useState(false)
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const [isBalance, setIsBalance] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            setIsID(id)
        }
    }, [])

    useEffect(() => {
        dispatch(fetchUserData())
    }, [dispatch])

    useEffect(() => {
        parseFloat(coin_count) > (user_coin.balance || 0)
            ? setIsBalance(true) : setIsBalance(false)
    }, [coin_count])

    const transition = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const response = await api.post('/payment/withdrawal/', {
                address: isID,
                amount: parseFloat(coin_count),
            }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            if (!response.data.response) {
                setIsUser(true)
                setLoading(false)
                return
            } else {
                setLoading(false)
                setCoinCount("")
                setIsID("")
                navigate('/waiting')
                dispatch(getProcess(coin_count))
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='contain-with-drawal-page'>
            <div>
                <FiChevronLeft onClick={() => navigate('/')} size={40} color='var(--orange)' />
            </div>
            <div className='contain-with-drawal-block'>
                <h1>Вывод</h1>
                <div className='coin-with-drawal' >
                    <img src={coin} alt="" className='coin-with-drawal_img' />
                </div>
                <div>
                    <div className='contain-with-drawal'>
                        <h1 className='balance-with-drawal'></h1>
                        <div>
                            <h1 className='text-main-with-drawal'>Введите свой адресс кошелька или отсканируйте QR code:</h1>
                            <div>
                                <input value={isID} onChange={(e) => setIsID(e.target.value)} type="text" />
                            </div>
                            {isUser ? <span className='error-text-with-drawal'>некорректный адресс кошелька</span> : ""}
                        </div>
                    </div>
                    <div className='contain-with-drawal'>
                        <h1 className='balance-with-drawal'>ваш текущий баланс: {user_coin.balance || 0}</h1>
                        <div>
                            <h1 className='text-main-with-drawal'>Сумма вывода:</h1>
                            <input type="number" value={coin_count} onChange={(e) => setCoinCount(e.target.value)} />
                        </div>
                        <span className='balance-with-drawal'>комиссия 3%</span>
                        {isBalance ? <span className='error-text-with-drawal'>недостаточно средств</span> : ""}
                    </div>
                    <div className='bottom-btn-with-drawal'>
                        <button onClick={() => navigate('/qr-scanner')}><IoQrCode size={40} /></button>
                        <button style={{ background: loading ? '#bba97a' : "#fdb602" }} disabled={loading} onClick={() => transition()} className='button-send-with-drawal'>
                            {loading ? <LoadingAnimate /> : <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}> <IoIosSend /> Вывести</div>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}