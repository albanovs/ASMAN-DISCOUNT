import React, { useState } from "react";
import "./settings.css";
import arrow from "../../views/coins/arrow-left.svg";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import Modal from "../../containers/UI/Modal/Modal";
import { FaCheck } from "react-icons/fa6";
import flag1 from "../../views/profile/flag1.svg";
import flag2 from "../../views/profile/flag2.svg";
import flag3 from "../../views/profile/flag3.svg";
import { Switch } from "antd";

const Settings = () => {
  const [data, setData] = useState([
    {
      img: flag1,
      text: "Кыргызча",
      state: false,
    },
    {
      img: flag2,
      text: "Русский",
      state: true,
    },
    {
      img: flag3,
      text: "English",
      state: false,
    },
  ]);
  const [modal, setModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Русский");
  const [isToggled, setIsToggled] = useState(false);
  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  const navigate = useNavigate();

  const handleLanguageSelection = (index) => {
    const updatedData = [...data];
    updatedData.forEach((item, i) => {
      item.state = i === index;
    });
    setData(updatedData);
    setSelectedLanguage(data[index].text);
  };

  return (
    <div className="settings">
      <div className="head">
        <img onClick={() => navigate(-1)} src={arrow} alt="" />
        <h1>Настройки</h1>
      </div>
      <div>
        <div onClick={() => setModal(true)} className="box mer">
          <p className="text">Язык</p>
          <div className="flex">
            <span>{selectedLanguage}</span>
            <IoIosArrowForward className="icon" />
          </div>
        </div>
        <div className="settings_block">
          <h2>Безопасность</h2>
          <div onClick={() => navigate("/change-password")} className="box">
            <p className="text">Пароль</p>
            <div className="flex">
              <span>Изменить</span>
              <IoIosArrowForward className="icon" />
            </div>
          </div>
          <div className="box">
            <p className="text">Вход по биометрии</p>
            <div>
              <Switch
                checked={isToggled}
                onChange={handleToggle}
                className={`custom-switch ${
                  isToggled ? "enabled" : "disabled"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <Modal setIsModalOpen={setModal}>
          <div className="leng">
            <h2>Выберите язык</h2>
            {data.map((el, index) => (
              <div
                key={index}
                onClick={() => handleLanguageSelection(index)}
                className="box"
              >
                <div className="flex">
                  <img src={el.img} alt="" />
                  <p className="text">{el.text}</p>
                </div>
                {el.state && <FaCheck color="#7FFF00" size={24} />}
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Settings;
