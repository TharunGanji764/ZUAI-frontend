import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { Provider } from "react-redux";
import store from "./redux/store";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import BlogItemDetails from "./components/BlogItemDetails";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route
            path="/blog/:id"
            element={<ProtectedRoute element={<BlogItemDetails />} />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
export default App;
