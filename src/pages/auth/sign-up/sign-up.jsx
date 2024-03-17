import React, { useState } from "react";
import "./sign-up.css";
import coin from "../covers/coin.png";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { api } from "../../../Api";

export default function SignUp() {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [inputData, setInputData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (inputData.password === inputData.confirm_password) {
      const dataNew = {
        email: inputData.email,
        first_name: inputData.first_name,
        last_name: inputData.last_name,
        password: inputData.password,
        confirm_password: inputData.confirm_password,
      };
      try {
        const response = await api.post("/auth/register/", dataNew);
        if (response.data.response === true) {
          localStorage.setItem("email", inputData.email);
          navigate("/send-code");
        } else {
          if (response.data.message) {
            alert(response.data.message, "error");
          }
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
      setError(false);
    } else {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div>
      <div className="container2">
        <div className="images2">
          <div className="coin2">
            <img src={coin} alt="" />
          </div>
          <form onSubmit={handleSubmit} className="submit2">
            <h1>Регистрация</h1>
            <div className="inputs2">
              <input
                value={inputData.email}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    email: e.target.value,
                  })
                }
                type="email"
                placeholder="email"
                required
              />
              <input
                value={inputData.first_name}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    first_name: e.target.value,
                  })
                }
                type="text"
                placeholder="ваше имя"
                required
              />
              <input
                value={inputData.last_name}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    last_name: e.target.value,
                  })
                }
                type="text"
                placeholder="фамилия"
                required
              />
              <div className="password2">
                <input
                  value={inputData.password}
                  onChange={(e) =>
                    setInputData({
                      ...inputData,
                      password: e.target.value,
                    })
                  }
                  maxLength="20"
                  type={visible ? "text" : "password"}
                  placeholder="Пароль"
                  required
                />
                <span
                  className="span-icon2"
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <div className="password2">
                <input
                  value={inputData.confirm_password}
                  onChange={(e) =>
                    setInputData({
                      ...inputData,
                      confirm_password: e.target.value,
                    })
                  }
                  maxLength="20"
                  type={visible2 ? "text" : "password"}
                  placeholder="Повторите пароль"
                  required
                />
                <span
                  className="span-icon2"
                  onClick={() => setVisible2(!visible2)}
                >
                  {visible2 ? <FaEye /> : <FaEyeSlash />}
                </span>
                {error && <p className="error-text2">* пароли не совпадают</p>}
              </div>
              <NavLink to="/forgot-password" className="link2">
                Забыли пароль ?
              </NavLink>
              <button onSubmit={handleSubmit} className="sign-up2">
                {loading ? "loading..." : "Далее"}
              </button>
            </div>
          </form>
          <p className="footer-text2">
            Есть аккаунт ?{" "}
            <NavLink to={"/login"} className="register2">
              войдите
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
