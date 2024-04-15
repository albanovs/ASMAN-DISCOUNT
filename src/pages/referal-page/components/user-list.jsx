import React from 'react';

const UserList = ({ users }) => {
    return (
        <div>
            {Object.entries(users).map(([status, userList]) => (
                <div className='ref_friends_contain' key={status}>
                    <h2>Cо статусом: <span>{status}</span></h2>
                    <div className='friend_block'>
                        {userList.map((user, index) => (
                            <div key={index}>
                                <div key={index}>
                                    <h1>{user.first_name} {user.last_name}</h1>
                                    <p>{user.email}</p>
                                </div>
                                <div>
                                    {
                                        user.bonuses.length ? user.bonuses.map((el, index) => {
                                            const datas = new Date(el.operation_time);
                                            const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
                                            const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(datas);
                                            return (
                                                <div className='bonuses_contain' key={index}>
                                                    <h3>бонус: <span>+{el.amount} asman</span></h3>
                                                    <p>{formattedDate} - {datas.getFullYear()}</p>
                                                </div>
                                            )
                                        }) : <div style={{ textAlign: 'center', fontSize: '10px' }}>
                                            Пока нет покупок
                                        </div>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserList;
