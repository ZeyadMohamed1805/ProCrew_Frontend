import React from 'react';
import { useState } from 'react';
import "./Sass/Header/Header.css";

export const Header = (props) => {
  //   Opening & Closing Sidebar
  const [sideNavDisplay, setSideNavDisplay] = useState("none");

  const handleCheckout = () => {
    let names = [];
    let prices = [];

    props.cartItem.forEach(item => {
        names.push(item.name);
        prices.push(item.price);
    });

    fetch("http://localhost:5000/addcheckout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: 0,
        name: names,
        price: prices
      })
    })
    .then(window.location.pathname = "/checkout");
  }

  return (
    <header>
        <nav id="main-nav">
            <div id="main-nav-container">
                <div id="main-nav-left">
                    <img src={require("./Images/logo2.png")} alt="ProCrew" />
                </div>
                <div id="main-nav-right">
                    <button onClick={() => {sideNavDisplay == "none" ? setSideNavDisplay("flex") : setSideNavDisplay("none")}}>Cart</button>
                </div>
                <i id="menu" className="fa-solid fa-cart-shopping" onClick={() => {sideNavDisplay == "none" ? setSideNavDisplay("flex") : setSideNavDisplay("none")}}></i>
            </div>
        </nav>
        <nav id="side-nav" style={{display: `${sideNavDisplay}`}}>
            <div id="side-nav-container">
                    {props.cartItem.map(item => (
                        <div id="side-nav-top">
                            <p>{item.name}{item.price}</p>
                        </div>
                    ))}
                <div id="side-nav-bottom">
                    <button onClick={handleCheckout}>Checkout</button>
                </div>
            </div>
        </nav>
    </header>
  )
}
