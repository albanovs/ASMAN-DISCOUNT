import React, { useEffect, useState } from 'react'
import './payments.css'
import { api } from '../../Api'
import { MdOutlineHistory } from "react-icons/md";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
export default function Payments() {

    const [history, setHistory] = useState([])

    const fetchDataHistory = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await api.get('/payment/history/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            setHistory(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchDataHistory()
    }, [])

    console.log(history);

    return (
        <div>
            <div className='section-payments'>
                {
                    history.map((data, index) => {

                        return (
                            <div key={index} className='section-payments_items'>
                                <h1>сегодня</h1>
                                <div>
                                    <h1>{data.info}</h1>
                                    <p
                                        className='detail_count_status'
                                        style={data.status === 0 ?
                                            { color: 'red' }
                                            : data.status === 1
                                                ? { color: '#00FF7F' }
                                                : { color: 'var(--orange)' }}
                                    >{data.total} <span>{data.status === 0 ? <MdCancel /> : data.status === 1 ? <IoCheckmarkDoneCircleSharp /> : <MdOutlineHistory />}</span></p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}