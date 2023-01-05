import React from 'react'
import { Link } from "react-router-dom";
import Logo from "../assets/vy.png";
import cartImage from "../assets/cart.png";
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const Navigation = useNavigate()
  let newUser = JSON.parse(localStorage.getItem("user-info"))

  function logout() {
    localStorage.clear()
    Navigation("/login")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/"> <img src={Logo} alt="vy shopping website" loading="lazy" /> </ Link >
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link"  to="/">Home <span className="sr-only">(current)</span></ Link >
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</ Link >
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/product">Product</ Link >
            </li>
            {
               newUser && newUser.role == 2 ? <>
              
              <li className="nav-item">
              <Link className="nav-link" to="/adminproduct">Admin Product</ Link >
            </li>
            
              </> : ""
            }
           
          </ul>

          {

            localStorage.getItem("user-info") ?
            
              <>
              
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">

                  {newUser && newUser.name}
                </button>
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={logout}>Logout</button>
                </div>
              </div>

              <div>
              <Link className="nav-link" to="/cart"><img src={cartImage} alt="Cart" className='mx-2' /></ Link >
                
              </div>
              </> : null
          }

        </div>


      </nav>
    </>
  )
}

export default Navbar