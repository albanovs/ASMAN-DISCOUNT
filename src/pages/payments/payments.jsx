import React, { useEffect, useState } from 'react'
import './payments.css'
import { api } from '../../Api'
import { MdOutlineHistory } from "react-icons/md";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { MdOutlineNavigateNext } from "react-icons/md";
import Modal from '../../containers/UI/Modal/Modal';
import { CiSearch } from "react-icons/ci";

export default function Payments() {

    const [history, setHistory] = useState([])
    const [modal, setModal] = useState(false)
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchDataHistory = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await api.get(`/payment/history/?datefrom=${startDate}&dateto=${endDate}`, {
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

    const handleSelectPeriod = (period) => {
        const today = new Date();
        switch (period) {
            case 'week':
                const weekAgo = new Date(today);
                weekAgo.setDate(weekAgo.getDate() - 7);
                setStartDate(weekAgo.toISOString().split('T')[0]);
                setEndDate(today.toISOString().split('T')[0]);
                break;
            case 'currentMonth':
                const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                setStartDate(firstDayOfMonth.toISOString().split('T')[0]);
                setEndDate(lastDayOfMonth.toISOString().split('T')[0]);
                break;
            case 'lastMonth':
                const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
                setStartDate(firstDayOfLastMonth.toISOString().split('T')[0]);
                setEndDate(lastDayOfLastMonth.toISOString().split('T')[0]);
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <div className='section-payments'>
                <div className='button_period' onClick={() => setModal(!modal)}>Выбрать период <MdOutlineNavigateNext /> </div>
                {modal && (
                    <Modal setIsModalOpen={setModal}>
                        <h1 className='text-modal-date'>Выберите дату:</h1>
                        <div className='contain-date-block'>
                            <div>
                                <span>от:</span>
                                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                            </div>
                            <div>
                                <span>до:</span>
                                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                            </div>
                        </div>
                        <div className='contain-date-block2'>
                            <button onClick={() => handleSelectPeriod('week')}>Неделя</button>
                            <button onClick={() => handleSelectPeriod('currentMonth')}>За текущий месяц</button>
                            <button onClick={() => handleSelectPeriod('lastMonth')}>За прошлый месяц</button>
                            <button style={{
                                background: 'var(--orange)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px'
                            }} onClick={() => {
                                fetchDataHistory()
                                setModal(false)
                            }}><CiSearch />Поиск</button>
                        </div>
                    </Modal>
                )}
                {
                    history.map((data, index) => {

                        return (
                            <div key={index} className='section-payments_items'>
                                <h1>{data.date}</h1>
                                {
                                    data.list.map((data, index) => {
                                        return (
                                            <div key={index}>
                                                <h1>{data.info}</h1>
                                                <p
                                                    className='detail_count_status'
                                                    style={data.status === 0 ?
                                                        { color: 'red' }
                                                        : data.status === 1
                                                            ? { color: '#00FF7F' }
                                                            : { color: 'var(--orange)' }}
                                                > {data.info === "Покупка Asman" && data.status === 2 ?
                                                    <span style={{ fontSize: "12px" }}>В обработке</span>
                                                    : data.info === "Покупка Asman" && data.status === 0 ? <span style={{ fontSize: "12px" }}>Отклонено</span> : data.type === 1 ? `+${data.total}` : `-${data.total}`}
                                                    <span>{data.status === 0 ? <MdCancel /> : data.status === 1 ? <IoCheckmarkDoneCircleSharp /> : <MdOutlineHistory />}</span></p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}
