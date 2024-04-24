import React, { useEffect, useState } from "react";
import "./change-password.css";
import { useNavigate } from "react-router-dom";
import arrow from "../../../views/coins/arrow-left.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { api } from "../../../Api";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [visible, setVisible] = useState({
    visible1: false,
    visible2: false,
    visible3: false,
  });
  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [local, setLocal] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLocal(token);
    }
  }, []);

  const headers = {
    Authorization: `Token ${local}`,
  };

  const ChangeFunc = async (e) => {
    e.preventDefault();
    if (
      password.new_password !== "" &&
      password.old_password !== "" &&
      password.confirm_password !== ""
    ) {
      if (password.new_password == password.confirm_password) {
        if (
          password.new_password.length >= 8 &&
          password.confirm_password.length >= 8
        ) {
          setLoading(true);
          try {
            const response = await api.post(
              "/auth/change-password/",
              {
                old_password: password.old_password,
                new_password: password.new_password,
                confirm_password: password.confirm_password,
              },
              { headers }
            );
            if (response.data.response === true) {
              alert("success");
              setPassword({
                ...password,
                old_password: "",
                new_password: "",
                confirm_password: "",
              });
            } else {
              alert("error");
            }
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.log(error);
          }
        } else {
          alert("Новый пароль должен быть не менее 8-ми символов", "error");
        }
      } else {
        alert("Пароли не совпадают", "error");
      }
    } else {
      alert("Заполните все поля!", "error");
    }
  };

  return (
    <div className="change_password">
      <div className="head">
        <img onClick={() => navigate(-1)} src={arrow} alt="" />
        <h1>Изиенить пароль</h1>
      </div>
      <div className="change_block">
        <form onSubmit={ChangeFunc} className="form_password">
          <div className="input_box">
            <label className="label_form">Старый пароль</label>
            <input
              className="input_form"
              value={password.old_password}
              onChange={(e) =>
                setPassword({ ...password, old_password: e.target.value })
              }
              type={visible.visible1 ? "text" : "password"}
              placeholder="Старый пароль"
              required
            />
            <span
              className="span-icon"
              onClick={() =>
                setVisible({ ...visible, visible1: !visible.visible1 })
              }
            >
              {visible.visible1 ? <FaEye /> : <FaEyeSlash />}{" "}
            </span>
          </div>
          <div className="input_box">
            <label className="label_form">Новый пароль</label>
            <input
              className="input_form"
              value={password.new_password}
              onChange={(e) =>
                setPassword({ ...password, new_password: e.target.value })
              }
              type={visible.visible2 ? "text" : "password"}
              placeholder="Новый пароль"
              required
            />
            <span
              className="span-icon"
              onClick={() =>
                setVisible({ ...visible, visible2: !visible.visible2 })
              }
            >
              {visible.visible2 ? <FaEye /> : <FaEyeSlash />}{" "}
            </span>
          </div>
          <div className="input_box">
            <label className="label_form">Повторите пароль</label>
            <input
              className="input_form"
              value={password.confirm_password}
              onChange={(e) =>
                setPassword({ ...password, confirm_password: e.target.value })
              }
              type={visible.visible3 ? "text" : "password"}
              placeholder="Повторите пароль"
              required
            />
            <span
              className="span-icon"
              onClick={() =>
                setVisible({ ...visible, visible3: !visible.visible3 })
              }
            >
              {visible.visible3 ? <FaEye /> : <FaEyeSlash />}{" "}
            </span>
          </div>
          <button
            disabled={loading}
            onSubmit={ChangeFunc}
            className="button_form"
          >
            {loading ? "loading..." : "Изменить"}
          </button>
        </form>
        <p className="text">
          Пароль должен содержать от 6 до 24 символов и может включать латинские
          буквы, а также специальные символы
        </p>
      </div>
    </div>
  );
};

export default ChangePassword;
