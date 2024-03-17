import React, { useState } from "react";
import "./support.css";
import arrow from "../../views/coins/arrow-left.svg";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import instagram from "../../views/profile/instagram.svg";
import facebook from "../../views/profile/facebook.svg";
import whatsapp from "../../views/profile/whatsapp.svg";
import telegram from "../../views/profile/telegram 1.svg";
import call from "../../views/profile/phone-call.svg";
import chat from "../../views/profile/bubble-chat.svg";
import Modal from "../../containers/UI/Modal/Modal";

const Support = () => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="support">
      <div className="head">
        <img onClick={() => navigate(-1)} src={arrow} alt="" />
        <h1>Служба поддержки</h1>
      </div>
      <div className="support_block">
        <div className="save">
          <a href="/">
            <div onClick={() => navigate("/support")} className="box top1">
              <div className="flex">
                <img src={call} alt="" />
                <p className="text">Позвонить</p>
              </div>
              <IoIosArrowForward className="icon" />
            </div>
          </a>
          <div className="line"></div>
            <div onClick={() => setModal(true)} className="box down">
              <div className="flex">
                <img src={chat} alt="" />
                <p className="text">Написать</p>
              </div>
              <IoIosArrowForward className="icon" />
            </div>
        </div>
        <h2>Мы в социальных сетях</h2>
        <div className="save">
          <a href="/">
            <div className="box top1">
              <div className="flex">
                <img src={instagram} alt="" />
                <p className="text">Instagram</p>
              </div>
              <IoIosArrowForward className="icon" />
            </div>
          </a>
          <div className="line"></div>
          <a href="/">
            <div className="box down">
              <div className="flex">
                <img src={facebook} alt="" />
                <p className="text">facebook</p>
              </div>
              <IoIosArrowForward className="icon" />
            </div>
          </a>
        </div>
        <div className="save">
          <div className="box top1">
            <div>
              <p className="label">Верся приложения</p>
              <p className="text">+1.1.10</p>
            </div>
          </div>
          <div className="box center">
            <div>
              <p className="label">Модель</p>
              <p className="text">iOS iphone 15 pro</p>
            </div>
          </div>
          <div className="box down">
            <div>
              <p className="label">Версия</p>
              <p className="text">iOS 17.3.1</p>
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <Modal setIsModalOpen={setModal}>
          <div className="block">
            <h2>Написать </h2>
            <a href="/">
              <div className="box">
                <div className="flex">
                  <img src={whatsapp} alt="" />
                  <p className="text">Whatsapp</p>
                </div>
                <IoIosArrowForward className="icon" />
              </div>
            </a>
            <a href="/">
              <div className="box">
                <div className="flex">
                  <img src={telegram} alt="" />
                  <p className="text">Telegrem</p>
                </div>
                <IoIosArrowForward className="icon" />
              </div>
            </a>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Support;
