import React, { useState } from "react";
import "./sign-in.css";
import coin from "../covers/coin.png";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { api } from "../../../Api";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/auth/login/", {
        email,
        password,
      });
      localStorage.setItem("email", email);
      if (response.data.response === true) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        navigate("/dashboard");
        alert(response.data.message);
      } else {
        if (response.data.message) {
          alert(response.data.message, "error");
        }
        if (response.data.isactivated == false) {
          alert(response.data.message, "error");
          navigate("/send-code");
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="images">
          <div className="coin">
            <img src={coin} alt="" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="submit">
              <h1>Вход</h1>
              <div className="inputs">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="email"
                  required
                />
                <div className="password">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    maxLength="20"
                    type={view ? "text" : "password"}
                    placeholder="Пароль"
                    required
                  />
                  <span className="span-icon" onClick={() => setView(!view)}>
                    {view ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                <NavLink to="/forgot-password" className="link">
                  Забыли пароль ?
                </NavLink>
                <button onSubmit={handleSubmit} className="sign-in">
                  {loading ? "loading..." : "Войти"}
                </button>
              </div>
            </div>
          </form>
          <p className="footer-text">
            нет аккаунта ?{" "}
            <NavLink to={"/register"} className="register">
              зарегистрируйтесь
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
