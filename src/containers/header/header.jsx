import React, { useEffect } from "react";
import "./header.css";
import { MdAccountCircle } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../App/slice/user-info";

export default function Header() {
  const dispatch = useDispatch();
  const names = useSelector((state) => state.user_info.user_info);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <div className="contain-header">
      <div className="header">
        <div className="profile-name">
          {names.profile_photo ? (
            <img className="profile-photo-header" src={names.profile_photo} alt="" />
          ) : (
            <MdAccountCircle size={40} />
          )}
          <h1>{names.first_name || "пользователь"}</h1>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <IoNotifications size={25} color="#E2A332" />
          <BiDotsVerticalRounded size={25} color="white" />
        </div>
      </div>
    </div>
  );
}