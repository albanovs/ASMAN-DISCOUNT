import React, { useEffect, useState } from 'react';
import './referal-page.css';
import { useDispatch } from 'react-redux';
import { fetchUserData } from '../../App/slice/user-info';
import { api } from '../../Api';
import { FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaStar } from "react-icons/fa";
import UserList from './components/user-list';
import LoadingAnimate from '../../UI-kit/loading';

export default function ReferalPage() {
    const [referalData, setReferalData] = useState([]);
    const [referalData2, setReferalData2] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUserData());
        fetchReferalData();
    }, [dispatch]);


    const fetchReferalData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.get('auth/ref-list/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            const response2 = await api.get('auth/ref-program/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            setReferalData(response.data);
            setReferalData2(response2.data)
        } catch (error) {
            console.log(error);
        }
    }

    const groupedUsers = referalData.reduce((acc, user) => {
        const status = user.status;
        if (!acc[status]) {
            acc[status] = [];
        }
        acc[status].push(user);
        return acc;
    }, {});

    const totalAmount = referalData.reduce((sum, user) => {
        return sum + user.bonuses.reduce((acc, bonus) => acc + bonus.amount, 0);
    }, 0);

    return (
        <div className='referal_container'>
            <div>
                <FiChevronLeft color='#fdb602' onClick={() => navigate('/profile')} size={40} />
            </div>
            <div>
                <div style={{ textAlign: 'center', margin: '10px 0', color: '#474747' }}>
                    <h1>Зарабротано всего:</h1>
                    <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'white', marginTop: '10px' }}> {totalAmount || 0} asman <FaStar color='#e48a21' /></p>
                </div>
            </div>
            <div className='container_radial'>
                {referalData2.count && Object.entries(referalData2.count).map(([item, data]) => (
                    <div key={item}>
                        <CircularProgressbar
                            className="custom-progress-bar"
                            value={data}
                            text={`${data}/${referalData2.program[item]}`}
                            strokeWidth={20}
                            styles={buildStyles({
                                width: '200px',
                                pathColor: '#52b202',
                                textColor: '#fff',
                                trailColor: '#282828de',
                                textSize: '20px',
                            })}
                        />
                        <p>{item === 'standard' ? 'стандарт'
                            : item === 'bronze' ? 'бронза'
                                : item === 'silver' ? 'серебро'
                                    : item === 'gold' ? 'золото' : 'VIP'}</p>
                    </div>
                ))}
            </div>
            <div className='referal_friends'>
                <h1>Приглашенные друзья:</h1>
                {
                    referalData.length ? <UserList users={groupedUsers} />
                        : <div style={{
                            width: '100%',
                            height: '30vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}><LoadingAnimate /></div>
                }
            </div>
        </div >
    );
}