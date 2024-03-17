import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/home-page/home-page";
import Payments from "../pages/payments/payments";
import Discount from "../pages/discount/discount";
import Market from "../pages/market/market";
import Profile from "../pages/profile/profile";
import Settings from "../pages/settings/settings";
import Support from "../pages/support/support";
import ChangePassword from "../pages/change-password/change-password";

export default function PageContent() {
  return (
    <div>
      <Routes>
        <Route exact={true} path="/" element={<HomePage />} />
        <Route exact={true} path="/payments" element={<Payments />} />
        <Route exact={true} path="/discount" element={<Discount />} />
        <Route exact={true} path="/market" element={<Market />} />
        <Route exact={true} path="/profile" element={<Profile />} />
        <Route exact={true} path="/settings" element={<Settings />} />
        <Route exact={true} path="/support" element={<Support />} />
        <Route
          exact={true}
          path="/change-password"
          element={<ChangePassword />}
        />
      </Routes>
    </div>
  );
}
