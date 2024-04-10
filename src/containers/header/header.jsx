import React from "react";
import "./header.css";
import { IoNotifications } from "react-icons/io5";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { api } from "../../Api";

export default function Header() {
  const names = useSelector((state) => state.user_info.user_info);
  const notif = useSelector((state) => state.notification.notification);
  const navigate = useNavigate()

  const filteredNotif = notif.filter(el => el.is_viewed === false)
  let viewsArr = []
  filteredNotif.map(item => (
    viewsArr.push(item.id)
  ))


  const updateNotif = async () => {
    const token = localStorage.getItem('token')
    try {
      if (names.notifications) {
        await api.post('payment/update-notifications/', {
          "notification_ids": viewsArr
        }, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
      }
      navigate('/notification')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="contain-header">
      <div className="header">
        <div className="profile-name" onClick={() => navigate('/profile')}>
          {names.profile_photo ? (
            <img
              className="profile-photo-header"
              src={names.profile_photo}
              alt=""
            />
          ) : (
            <Skeleton width={50} height={50} circle />
          )}
          <h1>{names.first_name || <Skeleton width={70} height={10} />}</h1>
        </div>
        <div onClick={updateNotif} style={{ margin: '5px', position: "relative" }}>
          {names.notifications > 0 ? <div className="count_notification">{names.notifications}</div> : ""}
          <IoNotifications size={25} color="#E2A332" />
        </div>
      </div>
    </div>
  );
}
