import React from "react";
import "./header.css";
import { IoNotifications } from "react-icons/io5";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const names = useSelector((state) => state.user_info.user_info);
  const navigate = useNavigate()

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
        <div onClick={() => navigate('/notification')} style={{ margin: '5px', position: "relative" }}>
          <div className="count_notification">1</div>
          <IoNotifications size={25} color="#E2A332" />
        </div>
      </div>
    </div>
  );
}
