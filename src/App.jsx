import { useState } from 'react'

import './App.css'
import Header from './components/Header'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart'
import { useRecipe } from './context/RecipeContext';
function App() {
  const {loading} = useRecipe();

  return (
    <>
     {loading && (
          <img
            src={"https://media0.giphy.com/media/8Ajc7LGGMYssG3Xwlm/giphy.gif"}
            alt="page loader"
            className="page-loader"
          />
        )}
         {!loading && (
      <div>
        <Header />
        <div>
        <Routes>
          <Route path="/"  element={<Home />}   />
          <Route path="/menu"   element={<Menu />}  />
          <Route path="/cart"   element={<Cart />}  />
        </Routes>
        </div>
      </div>)}
    </>
  )
}

export default App
