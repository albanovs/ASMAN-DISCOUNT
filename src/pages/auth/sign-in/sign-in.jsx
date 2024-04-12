import React, { useState } from "react";
import "./sign-in.css";
import coin from "../../../views/coins/asmancoin.png";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { api } from "../../../Api";
import LoadingAnimate from "../../../UI-kit/loading";

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
      if (response.data.response === true) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        if (response.data.message) {
          alert(response.data.message, "error");
        }
        if (response.data.isactivated === false) {
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
      <div className="container-sign-in">
        <div className="images-sign-in">
          <div className="coin-sign-in">
            <img src={coin} alt="" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="submit-sign-in">
              <h1>Вход</h1>
              <div className="inputs-sign-in">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="email"
                  required
                />
                <div className="password-sign-in">
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
                  Забыли пароль?
                </NavLink>
                <button style={{ background: loading ? '#bba97a' : "#fdb602", display: 'flex', justifyContent: 'center', alignItems: 'center' }} disabled={loading} onSubmit={handleSubmit} className="sign-in">
                  {loading ? <LoadingAnimate /> : "Войти"}
                </button>
              </div>
            </div>
          </form>
          <p className="footer-text">
            Нет аккаунта?
            <NavLink to={"/register"} className="register">
              зарегистрируйтесь
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
