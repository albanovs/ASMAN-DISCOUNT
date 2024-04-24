import React, { useState } from "react";
import "./support.css";
import arrow from "../../../views/coins/arrow-left.svg";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import Modal from "../../../containers/UI/Modal/Modal";
import { AiFillWechat } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

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
        <div className="ave">
          <div className=""></div>
          <div onClick={() => setModal(true)} className="box down">
            <div className="flex">
              <AiFillWechat size={25} color="white" />
              <p className="text">Написать</p>
            </div>
            <IoIosArrowForward className="icon" />
          </div>
        </div>
        <h2>Мы в социальных сетях</h2>
        <div className="save">
          <a
            target="blank"
            href="https://www.instagram.com/asman.coin"
          >
            <div className="box top1">
              <div className="flex">
                <AiFillInstagram size={25} color="white" />
                <p className="text">Instagram</p>
              </div>
              <IoIosArrowForward className="icon" />
            </div>
          </a>
          <div className="line"></div>
          <a target="blank" href="https://t.me/Asmancoin">
            <div className="box down">
              <div className="flex">
                <FaTelegramPlane size={25} color="white" />
                <p className="text">Telegram</p>
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
                  <IoLogoWhatsapp size={25} color="white" />
                  <p className="text">Whatsapp</p>
                </div>
                <IoIosArrowForward className="icon" />
              </div>
            </a>
            <a href="/https://t.me/Asman_discount">
              <div className="box">
                <div className="flex">
                  <FaTelegramPlane size={25} color="white" />
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
