import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "../src/components/screens/HomeScreen";
import CartScreen from "../src/components/screens/CartScreen";
import LoginScreen from "./components/screens/LoginScreen";
import SignupScreen from "./components/screens/SignupScreen";
import ProductScreen from "./components/screens/ProductsScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/cart/:id" element={<CartScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
