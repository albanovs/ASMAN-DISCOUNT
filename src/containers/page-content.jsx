import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/home-page/home-page";
import Payments from "../pages/payments/payments";
import Discount from "../pages/discount/discount";
import Market from "../pages/market/market";
import Profile from "../pages/profile/profile";
import WithDrawal from "../pages/asman-coin/with-drawal/with-drawal";
import Settings from "../pages/profile/settings/settings";
import Support from "../pages/profile/support/support";
import ReferalPage from "../pages/profile/referal-page/referal-page";
import ChangePassword from "../pages/auth/change-password/change-password";
import AdsDetail from "../pages/market/ads-detail/ads-detail";
import AdsPost from "../pages/market/ads-post/ads-post";
import FavoriteMarket from "../pages/market/favorite-market/favorite-market";
import MyPosts from "../pages/market/my-posts/my-posts";
import FilterMarket from "../pages/market/filter-market/filter-market";
import CategoryPage from "../pages/market/category-page/category-page";

export default function PageContent() {
  return (
    <div>
      <Routes>
        <Route exact={true} path="/" element={<HomePage />} />
        <Route exact={true} path="/payments" element={<Payments />} />
        <Route exact={true} path="/discount" element={<Discount />} />
        <Route exact={true} path="/market" element={<Market />} />
        <Route exact={true} path="/profile" element={<Profile />} />

        <Route exact={true} path="/with-drawal/:id" element={<WithDrawal />} />
        <Route exact={true} path="/drawal-with" element={<WithDrawal />} />
        <Route exact={true} path="/settings" element={<Settings />} />
        <Route exact={true} path="/support" element={<Support />} />
        <Route exact={true} path="/referal" element={<ReferalPage />} />
        <Route exact={true} path="/change-password" element={<ChangePassword />} />

        <Route path="/market-detail/:id" element={<AdsDetail />} />
        <Route path="ads-post" element={<AdsPost />} />
        <Route path="favorite-market" element={<FavoriteMarket />} />
        <Route path="my-posts" element={<MyPosts />} />
        <Route path="filter-market/:page" element={<FilterMarket />} />
        <Route path="filter-market" element={<FilterMarket />} />
        <Route path="category-market/:state" element={<CategoryPage />} />
      </Routes>
    </div>
  );
}
