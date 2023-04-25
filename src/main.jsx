import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import './media.css'
import'./css/card.css'
import'./css/cart.css'
import { RecipeProvider } from './context/RecipeContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <RecipeProvider>
    <App />
    </RecipeProvider>
    </Router>
  </React.StrictMode>,
)
