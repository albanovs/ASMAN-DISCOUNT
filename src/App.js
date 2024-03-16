import EmailCode from "./pages/auth/email-code/email-code";
import SignIn from "./pages/auth/sign-in/sign-in";
import SignUp from "./pages/auth/sign-up/sign-up";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import LayOut from "./containers/layout/lay-out";
import ForgotPassword from "./pages/auth/forgot-password/forgot-password";
import MyQRcode from "./pages/home-page/components/QR code/my-qr";

function App() {
  const location = useLocation();

  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    handleScroll();
  }, [location]);

  return (
    <div className="App">
      <Routes location={location}>
        <Route path="/register" element={<SignUp />} />
        <Route path="/my-qr" element={<MyQRcode />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/send-code" element={<EmailCode />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<div>Hello</div>} />
        <Route path="/*" element={<LayOut />} />
      </Routes>
    </div>
  );
}

export default App;
