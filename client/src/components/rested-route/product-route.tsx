import { Routes, Route, useParams, Navigate } from "react-router-dom";
import ProductDashboard from "../dashboard/product-dashboard";

const ProductDetails = () => {
  const { pid } = useParams();

  // Ensure that `pid` is a valid product ID (if needed, add more checks)
  if (!pid) return <Navigate to="/dashboard/products" replace />;

  return <ProductDashboard />;
};

const ProductsRoutes = () => {
  return (
    <Routes>
      <Route index element={<ProductDashboard />} />
      <Route path="new" element={<ProductDashboard />} />
      <Route path=":pid" element={<ProductDetails />} />
      {/* Catch-all for invalid sub-paths */}
      <Route path="*" element={<Navigate to="/dashboard/products" replace />} />
    </Routes>
  );
};

export default ProductsRoutes;
