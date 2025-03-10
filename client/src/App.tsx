import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import AppleAuthWrapper from "./provider/AuthWrapper";
import GuestOnlyWrapper from "./provider/GuestOnlyWrapper";
import AdminWrapper from "./provider/AdminWrapper";
import { Support } from "./pages/support";
import GlobalLoader from "./components/global-loader";

// Lazy load pages
const Home = lazy(() => import("./pages/home"));
const ItemDetails = lazy(() => import("./pages/product-details-page"));
const ItemsOrder = lazy(() => import("./pages/product-order-page"));
const ShopPage = lazy(() => import("@/src/pages/shop-page"));
const NotFound = lazy(() => import("./pages/not-found"));
const AppleAuthPage = lazy(() => import("./pages/auth"));
const ForgotPasswordPage = lazy(() => import("./pages/forgot-password-page"));
const Cart = lazy(() => import("./pages/cart"));
const OrdersPage = lazy(() => import("./pages/order"));
const OrderDetailsPage = lazy(() => import("./pages/one-order"));
const ProfilePage = lazy(() => import("./pages/profile"));
const CMS = lazy(() => import("./pages/cms"));
const CreateProductPage = lazy(
  () => import("./components/dashboard/product-form")
);
const CreateProductOptionPage = lazy(
  () => import("./components/dashboard/product-option-form")
);
const CheckoutSuccess = lazy(() =>
  import("./pages/checkout").then((m) => ({ default: m.CheckoutSuccess }))
);
const CheckoutCancelled = lazy(() =>
  import("./pages/checkout").then((m) => ({ default: m.CheckoutCancelled }))
);

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <main className="min-h-[100vh] pt-16">
          <Suspense fallback={<GlobalLoader />}>
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
                <Route
                  path="products/edit/:id"
                  element={<CreateProductPage />}
                />
                <Route
                  path="product-options/create"
                  element={<CreateProductOptionPage />}
                />
                <Route
                  path="product-options/edit/:id"
                  element={<CreateProductOptionPage />}
                />
              </Route>

              <Route path="/checkout-success" element={<CheckoutSuccess />} />
              <Route
                path="/checkout-cancelled"
                element={<CheckoutCancelled />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
