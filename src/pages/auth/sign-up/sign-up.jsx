import React, { useState } from "react";
import "./sign-up.css";
import coin from "../../../views/coins/asmancoin.png";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { api } from "../../../Api";
import LoadingAnimate from "../../../UI-kit/loading";

export default function SignUp() {

  const { id } = useParams()
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [massage, setMassage] = useState("")
  const [isPassword, setIsPassword] = useState("")
  const [rule, setRule] = useState(false)
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
      if (inputData.password.length < 8) {
        setLoading(false);
        setIsPassword("Пароль должен содержать не менее 8 символов");
        return;
      }
      setError(true);
      const dataNew = {
        email: inputData.email,
        first_name: inputData.first_name,
        last_name: inputData.last_name,
        password: inputData.password,
        confirm_password: inputData.confirm_password,
        referred_by: id
      };
      try {
        const response = await api.post("/auth/register/", dataNew);
        localStorage.setItem("email", inputData.email);
        setLoading(false);
        if (response.data.email) {
          setMassage(response.data.email)
          return
        }
        navigate("/send-code");
      } catch (error) {
        console.log(error);
      }
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
                onChange={(e) => {
                  setInputData({
                    ...inputData,
                    email: e.target.value,
                  });
                  setMassage("");
                }}
                type="email"
                placeholder="email"
                required
                autoComplete="off"
              />
              <span style={{ color: 'red', fontSize: '10px' }}>{massage}</span>
              <input
                value={inputData.first_name}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    first_name: e.target.value,
                  })
                }
                autoComplete="off"
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
                autoComplete="off"
                type="text"
                placeholder="фамилия"
                required
              />
              <div className="password2">
                <input
                  value={inputData.password}
                  onChange={(e) => {
                    setInputData({
                      ...inputData,
                      password: e.target.value,
                    })
                    setIsPassword("")
                  }
                  }
                  autoComplete="off"
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
                  autoComplete="off"
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
                <span style={{ color: 'red', fontSize: '10px' }}>{isPassword}</span>
              </div>
              <div className="rules_register">
                <input type="checkbox" required onChange={() => setRule(!rule)} />
                <NavLink to="/rules" className="link2">
                  пользовательское соглашение
                </NavLink>
              </div>
              <button style={{ background: loading ? '#bba97a' : "#fdb602" }} disable={loading} type="submit" className="sign-up2">
                {loading ? <LoadingAnimate /> : "Далее"}
              </button>
            </div>
          </form>
          <p className="footer-text2">
            Есть аккаунт?
            <NavLink to={"/login"} className="register2">
              войдите
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}