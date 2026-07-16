import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { HashRouter  as Router, Routes, Route} from 'react-router-dom'
import HomeScreen from '../src/components/screens/HomeScreen'
import CartScreen from '../src/components/screens/CartScreen'
import LoginScreen from './components/screens/LoginScreen'
import SignupScreen from './components/screens/SignupScreen'
import LogoutScreen from './components/screens/LogoutScreen'
import ProductScreen from './components/screens/ProductsScreen'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
      </Routes >
      <Routes>
        <Route exact path="/cart" element={<CartScreen />} /> 
      </Routes>
      <Routes>
        <Route exact path="/login" element={<LoginScreen />} />
      </Routes>
      <Routes>
        <Route path="/signup" element={<SignupScreen />} />
      </Routes>
      <Routes>
        <Route exact path="/logout" element={<LogoutScreen />} />
      </Routes>
      <Routes>
        <Route exact path="/product/:id" element={<ProductScreen />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
