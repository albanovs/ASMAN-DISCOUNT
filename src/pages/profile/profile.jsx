import React, { useEffect, useState } from "react";
import "./profile.css";
import { api } from "../../Api";
import { IoIosArrowForward } from "react-icons/io";
import agreement from "../../views/profile/agreement.svg";
import support from "../../views/profile/customer-support.svg";
import marketing from "../../views/profile/marketing.svg";
import logoutImage from "../../views/profile/logout.svg";
import settings from "../../views/profile/settings.svg";
import Modal from "../../containers/UI/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../App/slice/user-info";
import Storis from "../../containers/stories/stories";

export default function Profile() {
  const [modal, setModal] = useState(false);
  const [photo, setPhoto] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const names = useSelector((state) => state.user_info.user_info);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (names) {
      setLoading(false);
      setLoadingPhoto(false);
    }
  }, [names]);

  const handleImageChange = (event) => {
    const imageFile = event.target.files && event.target.files[0];
    if (imageFile) {
      const formData = new FormData();
      formData.append("profile_photo", imageFile);
      const token = localStorage.getItem("token");

      api
        .post("/auth/update-photo/", formData, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          if (response.data) {
            dispatch(fetchUserData());
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setLoadingPhoto(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <>
      <div className="profile">
        {photo && (
          <div onClick={() => setPhoto(false)} className="photo_big">
            <img src={names?.profile_photo} alt="" />
          </div>
        )}
        <div>
          <h1>Профиль</h1>
          {loading ? (
            <div>
              <div
                style={{ marginBottom: 50 }}
                className="discount_box_skeleton_head"
              ></div>
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="discount_box_skeleton"></div>
              ))}
            </div>
          ) : (
            <>
              {loadingPhoto ? (
                <div className="discount_box_skeleton_head"></div>
              ) : (
                <img
                  onClick={() => setPhoto(true)}
                  className="profile_image"
                  src={names?.profile_photo}
                  alt=""
                />
              )}

              <p className="name">
                {names?.last_name} {names?.first_name}{" "}
              </p>
              <form onSubmit={handleImageChange}>
                <label>
                  <p className="change_photo">Изменить Фотографию</p>
                  <input
                    className="input_form"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </label>
              </form>
              <div className="profile_block">
                <div className="save">
                  <div className="box top1">
                    <div>
                      <p className="label">Номер телефона</p>
                      <p className="text">{names?.phone}</p>
                    </div>
                    <IoIosArrowForward className="icon" />
                  </div>
                  <div className="line"></div>
                  <div className="box down">
                    <div>
                      <p className="label">E-mail</p>
                      <p className="text">{names?.email}</p>
                    </div>
                    <IoIosArrowForward className="icon" />
                  </div>
                </div>
                <div className="save">
                  <div
                    onClick={() => navigate("/support")}
                    className="box top1"
                  >
                    <div className="flex">
                      <img src={support} alt="" />
                      <p className="text">Служба поддрежки</p>
                    </div>
                    <IoIosArrowForward className="icon" />
                  </div>
                  <div className="line"></div>
                  <div className="box down">
                    <div className="flex">
                      <img src={agreement} alt="" />
                      <p className="text">Договоры и правила </p>
                    </div>
                    <IoIosArrowForward className="icon" />
                  </div>
                </div>
                <div className="box">
                  <div className="flex">
                    <img src={marketing} alt="" />
                    <p className="text">Рефералы</p>
                  </div>
                  <IoIosArrowForward className="icon" />
                </div>
                <div onClick={() => navigate("/settings")} className="box">
                  <div className="flex">
                    <img src={settings} alt="" />
                    <p className="text">Настройки</p>
                  </div>
                  <IoIosArrowForward className="icon" />
                </div>
                <div onClick={() => setModal(true)} className="box top">
                  <div className="flex">
                    <img src={logoutImage} alt="" />
                    <p className="text">Выйти</p>
                  </div>
                  <IoIosArrowForward className="icon" />
                </div>
              </div>
            </>
          )}
        </div>
        {modal && (
          <Modal setIsModalOpen={setModal}>
            <div className="block_logout">
              <p className="title">Подтвердите действие </p>
              <p className="text">вы уверены что хотите выйти из приложения </p>
              <div className="flex">
                <button onClick={() => setModal(false)} className="btn">
                  Нет
                </button>
                <button onClick={() => logout()} className="btn red">
                  Да, уверен
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}
