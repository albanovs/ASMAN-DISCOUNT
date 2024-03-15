import EmailCode from "./pages/auth/email-code/email-code";
import SignIn from "./pages/auth/sign-in/sign-in";
import SignUp from "./pages/auth/sign-up/sign-up";
import { Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css'
import { useEffect } from "react";

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
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Routes location={location}>
            <Route path="/register" element={<SignUp />} />
            <Route path="/" element={<SignIn />} />
            <Route path="/send-code" element={<EmailCode />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;