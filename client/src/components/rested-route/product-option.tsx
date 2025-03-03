import { Routes, Route, useParams, Navigate } from "react-router-dom";
import ProductOptionsDashboard from "../dashboard/product-options-dashboard";

const ProductOptionDetails = () => {
  const { poid } = useParams();

  if (!poid) return <Navigate to="/dashboard/product-options" replace />;

  return <ProductOptionsDashboard />;
};

const ProductOptionsRoutes = () => {
  return (
    <Routes>
      <Route index element={<ProductOptionsDashboard />} />
      <Route path="new" element={<ProductOptionsDashboard />} />
      <Route path=":poid" element={<ProductOptionDetails />} />
      {/* Catch-all for invalid sub-paths */}
      <Route
        path="*"
        element={<Navigate to="/dashboard/product-options" replace />}
      />
    </Routes>
  );
};

export default ProductOptionsRoutes;
