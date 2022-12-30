import React from 'react'
import { Link } from 'react-router-dom';
import poster from "../assets/Home-poster.png"

function Home() {
  return (
    <>
   <div className="d-flex justify-content-between jumbotron jumbotron-home" >
  <div className='d-flex flex-column justify-content-center'>
  <h1 className="display-4 font-weight-normal text-white">Shop on VY</h1>
  <p className="lead font-weight-normal text-white">India’s Largest Shopping Market
Get Chance To Buy 
Product In Cheap Prize.
</p>
  <div>
  <Link className="btn  btn-lg m-3 button-blue" to="/login" role="button">Login</Link>
  <Link className="btn  btn-lg m-3 button-blue" to="/register" role="button">Register</Link>
  </div>
  </div>
  <div>
    <img src={poster} alt="" width={400}/>
  </div>
</div>
    </>
  )
}

export default Home