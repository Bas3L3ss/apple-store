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

function App() {
  return (
    <Router>
      <Navbar />
      <main className="min-h-[100vh] pt-16 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:slug" element={<ItemsOrder />} />
          <Route path="/more/:slug" element={<ItemDetails />} />
          <Route path="/auth" element={<AppleAuthPage />} />
          <Route path="/auth/forgot" element={<ForgotPasswordPage />} />
          <Route path="/not-found" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
