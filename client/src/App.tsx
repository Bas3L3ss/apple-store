import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import ItemDetails from "./pages/product-details-page";
import ItemsOrder from "./pages/product-order-page";
import ShopPage from "@/src/pages/shop-page";
import Navbar from "./components/nav-bar";
import Footer from "./components/footer";
import NotFound from "./pages/not-found";
import AppleAuthPage from "./pages/auth";
import ForgotPasswordPage from "./pages/forgot-password-page";
import { Support } from "./pages/support";
import Cart from "./pages/cart";
import OrdersPage from "./pages/order";
import OrderDetailsPage from "./pages/one-order";
import ProfilePage from "./pages/profile";
import AppleAuthWrapper from "./provider/AuthWrapper";
import GuestOnlyWrapper from "./provider/GuestOnlyWrapper";
import AdminWrapper from "./provider/AdminWrapper";
import CMS from "./pages/cms";
import CreateProductPage from "./components/dashboard/product-form";
import CreateProductOptionPage from "./components/dashboard/product-option-form";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <main className="min-h-[100vh] pt-16 ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:slug" element={<ItemsOrder />} />
            <Route path="/more/:slug" element={<ItemDetails />} />
            <Route
              path="/auth"
              element={
                <GuestOnlyWrapper>
                  <AppleAuthPage />
                </GuestOnlyWrapper>
              }
            />
            <Route
              path="/auth/forgot"
              element={
                <GuestOnlyWrapper>
                  <ForgotPasswordPage />
                </GuestOnlyWrapper>
              }
            />
            <Route path="/support" element={<Support />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/order"
              element={
                <AppleAuthWrapper>
                  <OrdersPage />
                </AppleAuthWrapper>
              }
            />
            <Route
              path="/order/:id"
              element={
                <AppleAuthWrapper>
                  <OrderDetailsPage />
                </AppleAuthWrapper>
              }
            />
            <Route
              path="/profile"
              element={
                <AppleAuthWrapper>
                  <ProfilePage />
                </AppleAuthWrapper>
              }
            />

            <Route
              path="/dashboard"
              element={
                <AppleAuthWrapper>
                  <AdminWrapper>
                    <CMS />
                  </AdminWrapper>
                </AppleAuthWrapper>
              }
            >
              <Route path="products/create" element={<CreateProductPage />} />
              <Route path="products/edit/:id" element={<CreateProductPage />} />
              <Route
                path="product-options/create"
                element={<CreateProductOptionPage />}
              />
              <Route
                path="product-options/edit/:id"
                element={<CreateProductOptionPage />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
