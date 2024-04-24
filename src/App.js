import EmailCode from "./pages/auth/email-code/email-code";
import SignIn from "./pages/auth/sign-in/sign-in";
import SignUp from "./pages/auth/sign-up/sign-up";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import LayOut from "./containers/layout/lay-out";
import ForgotPassword from "./pages/auth/forgot-password/forgot-password";
import { SkeletonTheme } from "react-loading-skeleton";
import WaitingProcess from "./pages/payments/components/waiting/waitng-process";
import SuccessPayments from "./pages/payments/components/success-payments/success-payments";
import "react-loading-skeleton/dist/skeleton.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import { fetchUserData } from "./App/slice/user-info";
import NotificationPage from "./pages/notification/notification";
import { fetchStatusData } from "./App/slice/status";
import { ToastContainer } from "react-toastify";
import MyQRcode from "./pages/home-page/components/QR code/my-qr/my-qr";
import QrDetails from "./pages/home-page/components/QR code/qr-details/qr-details";
import DiscountDetail from "./pages/discount/discount-detail/discount-detail";
import BuyAsman from "./pages/asman-coin/buy-asman/buy-asman";
import VvodAsman from "./pages/asman-coin/vvod-asman/vvod-asman";
import DiscountBuy from "./pages/discount/discount-detail/discount-buy";
import Rules from "./pages/profile/settings/rules";
import QRScanner from "./pages/home-page/components/QR code/qr-scanner/qr-scanner";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchStatusData());
  }, [dispatch]);

  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    handleScroll();
  }, [location]);

  const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem("token");

    return token ? element : <Navigate to="/register" replace />;
  };

  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <Routes location={location}>
          <Route
            path="/my-qr"
            element={<PrivateRoute element={<MyQRcode />} />}
          />
          <Route
            path="/qr-scanner"
            element={<PrivateRoute element={<QRScanner />} />}
          />
          <Route
            path="/details-qr/:id"
            element={<PrivateRoute element={<QrDetails />} />}
          />
          <Route
            path="/qr-details"
            element={<PrivateRoute element={<QrDetails />} />}
          />
          <Route
            path="/discount-detail/:id"
            element={<PrivateRoute element={<DiscountDetail />} />}
          />
          <Route
            path="/discount-detail-forsale/:id"
            element={<PrivateRoute element={<DiscountBuy />} />}
          />
          <Route
            path="/buy-asman"
            element={<PrivateRoute element={<BuyAsman />} />}
          />
          <Route
            path="/vvod-asman"
            element={<PrivateRoute element={<VvodAsman />} />}
          />
          <Route
            path="/waiting"
            element={<PrivateRoute element={<WaitingProcess />} />}
          />
          <Route
            path="/success-payments"
            element={<PrivateRoute element={<SuccessPayments />} />}
          />
          <Route
            path="/notification"
            element={<PrivateRoute element={<NotificationPage />} />}
          />
          <Route path="/*" element={<PrivateRoute element={<LayOut />} />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/register/:id" element={<SignUp />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/send-code" element={<EmailCode />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </SkeletonTheme>
    </div>
  );
}

export default App;