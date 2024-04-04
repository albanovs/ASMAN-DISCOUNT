import React from 'react'
import './notification.css'
import { api } from '../../Api'
import { useState, useEffect } from 'react'
import { FiChevronLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export default function NotificationPage() {

    const [notification, setNotification] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getNotif = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await api.get('payment/notifications/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                })
                setNotification(response.data)
            } catch (error) {
                console.log(error);
            }
        }

        getNotif()
    }, [])

    return (
        <div className='notifictaion_container'>
            <div>
                <FiChevronLeft color='#fdb602' onClick={() => navigate('/')} size={40} />
            </div>
            <div>
                {
                    notification.map(el => {
                        return (
                            <div className='item_notification'>
                                <div>
                                    <img src={el.img} alt="" />
                                    <div>
                                        <h1>Покупкка: {el.amount}</h1>
                                        <p>{el.info}</p>
                                        <h2>Доступно: {el.balance} asman</h2>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}