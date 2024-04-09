import React, { useEffect, useState } from 'react';
import './referal-page.css';
import { useDispatch } from 'react-redux';
import { fetchUserData } from '../../App/slice/user-info';
import { api } from '../../Api';
import { FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import bronze from '../../views/disc/one.svg';

export default function ReferalPage() {
    const [referalData, setReferalData] = useState([]);
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
            setReferalData(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const percentage = 54;
    const percentage2 = 29;
    const percentage3 = 40;
    const percentage4 = 70;
    const percentage5 = 48;
    

    return (
        <div className='referal_container'>
            <div>
                <FiChevronLeft color='#fdb602' onClick={() => navigate('/profile')} size={40} />
            </div>
            <div className='container_radial'>
                <CircularProgressbar
                    className="custom-progress-bar"
                    value={percentage}
                    text={`стандарт ${percentage}%`}
                    strokeWidth={20}
                    styles={buildStyles({
                        width: '200px',
                        pathColor: '#52b202',
                        textColor: '#fff',
                        trailColor: 'rgba(0, 0, 0, 0.1)',
                        textSize: '10px',
                    })}
                />
                <CircularProgressbar
                    className="custom-progress-bar"
                    value={percentage2}
                    strokeWidth={20}
                    text={`стандарт ${percentage2}%`}
                    styles={buildStyles({
                        width: '200px',
                        pathColor: '#52b202',
                        textColor: '#fff',
                        trailColor: 'rgba(0, 0, 0, 0.1)',
                        textSize: '10px',
                    })}
                />
                <CircularProgressbar
                    className="custom-progress-bar"
                    value={percentage3}
                    strokeWidth={20}
                    text={`стандарт ${percentage3}%`}
                    styles={buildStyles({
                        width: '200px',
                        pathColor: '#52b202',
                        textColor: '#fff',
                        trailColor: 'rgba(0, 0, 0, 0.1)',
                        textSize: '10px',
                    })}
                />
                <CircularProgressbar
                    className="custom-progress-bar"
                    value={percentage4}
                    strokeWidth={20}
                    text={`стандарт ${percentage4}%`}
                    styles={buildStyles({
                        width: '200px',
                        pathColor: '#e48a21',
                        textColor: '#fff',
                        trailColor: 'rgba(0, 0, 0, 0.1)',
                        textSize: '10px',
                    })}
                />
                <CircularProgressbar
                    className="custom-progress-bar"
                    value={percentage5}
                    strokeWidth={20}
                    text={`стандарт ${percentage5}%`}
                    styles={buildStyles({
                        width: '300px',
                        pathColor: '#e48a21',
                        textColor: '#fff',
                        trailColor: 'rgba(0, 0, 0, 0.1)',
                        textSize: '10px',
                    })}
                />
            </div>
        </div >
    );
}
