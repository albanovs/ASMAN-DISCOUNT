import React, { useState } from "react";
import "./forgot-password.css";
import { useNavigate } from "react-router-dom";
import { api } from "../../../Api";
import coin from "../covers/coin.png";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/auth/forgot-password/", {
        email,
      });
      if (response.data.response === true) {
        localStorage.setItem("email", email);
        alert(response.data.message, "success");
        navigate("/login");
      } else {
        if (response.data.message) {
          alert(response.data.message, "error");
        }
        setError(response.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="container2">
      <div className="images">
        <div className="coin">
          <img src={coin} alt="" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="submit">
            <h1>Забыли пароль?</h1>
            <p className="text_gray">
              Мы отправим код на вашу электронную почту
            </p>
            <div className="inputs">
              <label className="label_form">Почта</label>
              <input
                className="input_form"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Электронная почта"
                required
              />
              {error.email && <p className="red">{error.email}</p>}
              <button
                style={{ marginBottom: 28 }}
                onSubmit={handleSubmit}
                className="forgot-password"
              >
                {loading ? "loading..." : "Получить код"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
