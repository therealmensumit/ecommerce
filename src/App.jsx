import WebFont from "webfontloader";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Home, Product, ProductDetail } from "./Pages";
// import PrivateRoute from "./Auth/PrivateRoute";
// import { Provider } from "react-redux";
// import store from "./redux/store";

export default function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto: 300,400,500,600,700,800"],
      },
    });
  }, []);

  return (
    // <Provider store={store}>
    <Routes>
      <Route index element={<Home />} />
      <Route path="/product" element={<Product />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
    // </Provider>
  );
}
