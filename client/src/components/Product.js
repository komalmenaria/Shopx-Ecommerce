import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

function Product() {
  const Navigation = useNavigate();
  const [data, setData] = useState([])


  async function fetchData() {
    let result = await fetch("http://localhost:4000/api/items");
    result = await result.json();
    // console.log(result)
    setData(result)
    // console.log(data)

  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Navigation("/login")
    } else {
      fetchData();
    }
    //  console.log(data)


  }, []);
  return (
    <>
      <div className="container my-3">
        <h1 className='text-center'>Products</h1>
        <div className="d-flex  justify-content-between flex-wrap">
          {data.length ?
            data.map((item) => (
              <div key={item} className="card my-2" style={{ width: "22rem" }} >
                <img src={item.imageKey} className="card-img-top m-2 align-self-center" alt={item.title} style={{ width: "15rem" }} loading="lazy" />
                <div className="card-body text-center">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className='card-text '>Price {item.price} </p>

                  <div className="card-body d-flex justify-content-center">
                    <button className="btn btn-primary mx-1">Buy Now</button>
                    <button className="btn btn-primary mx-1">Add to Cart</button>
                  </div>
                </div>
              </div>))
            : "not found"}
        </div>
      </div>
    </>

  )
}

export default Product