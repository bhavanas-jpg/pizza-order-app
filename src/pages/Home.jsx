
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="container">
      <div className="hero-image">
      <div className="hero-text">
      <h1 className="heading">
         <span className="first-word">MORE </span>THAN <br />
          JUST PIZZA
        </h1>
        <p className="para">
          Our menu has something for everyone. stop bite for a quite bite or get
          your favorites delivered right to your door
        </p>
        <button className="order-btn">Order now</button>
        <Link to="/menu" className="menu-link">
          see the menu
          <i className="fa fa-arrow-right" aria-hidden="true"></i>
        </Link>
      </div>
      </div>

    </div>
  )
}

export default Home