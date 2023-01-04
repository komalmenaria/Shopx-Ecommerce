import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cart() {
  const [data, setData] = useState([])
  const [responseData, setResponseData] = useState("")
  const [itemQuantity, setItemQuantity] = useState("")
  let newUser = JSON.parse(localStorage.getItem("user-info"))
const token = localStorage.getItem("token");
  async function getCartDetails() {
    try {
      let result = await fetch(`http://localhost:4000/api/getcartitem/${newUser.id}`,{
        method: 'GET',
        headers: {
          "x-auth-token": token
        }
      })
      result = await result.json();
      setData(result.items)
      setResponseData(result)
      // console.log(result)
    }
    catch (error) {
      console.log(error)
    }
  }

  async function deleteItemInCart(item) {
    try {
      await fetch(`http://localhost:4000/api/deletecartitem/${responseData.userId}/${item.productId}`, {
        method: 'DELETE',
        headers: {
            "x-auth-token": token
          }
      });

      getCartDetails()
    }
    catch (error) {
      console.log(error)
    }
  }

  const updateCartItem = async (value,item) =>{
console.log(item)
        try {
         
       let  result = await axios.put(`http://localhost:4000/api/updatecartitem/${responseData.userId}` ,
       { productId: item.productId, quantity: value },
       {
        headers: {
          "x-auth-token":  token //the token is a variable which holds the token
        }
       }
        )
    console.log(result)
          getCartDetails()
        }
        catch (error) {
          console.log(error.message)
        }
  }
  
  useEffect(() => {

    getCartDetails()
  }, [])

  return (
    <>

      <div className="d-flex  jumbotron">

        <div className="col-sm-8 " style={{ backgroundColor: "white" }}>
          {data.length ?
            data.map((item, index) => (
              <>
                <div className="media m-3 " key={item} >
                  <p className="mr-3 id-index">{index + 1}</p>
                  <img src={item.imageKey} className="mr-3" alt={item.name} style={{ width: "100px" }} />
                  <div className="media-body">
                    <h4 className="mt-0">{item.name}</h4>
                    <p className='custom-margin-for-p' >Desc: {item.description}</p>
                    <p className='custom-margin-for-p'>Price: {item.price}</p>
                    <div className="d-flex align-items-center my-2">
                      <label htmlFor='quantity' className='custom-margin-for-p'>Qty:</label>
                      <select className="custom-select col-sm-2 mx-2" id="inputGroupSelect01"  onChange={ 
                        ({ target: { value } }) => updateCartItem(value,item) }>
                        <option value={item.quantity}>{item.quantity}</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>

                    </div>

                  </div>

                  <button className='btn btn-danger' onClick={() => deleteItemInCart(item)}>Delete</button>

                </div>
                <hr className="my-4" />

              </>
            ))
            : <h1>No Products In the Cart</h1>

          }
         <div className="d-flex justify-content-end my-3">
          {
            data.length ? <>
              <h3 className='my-2'>Subtotal&#40;{data.length}&#41; : ₹{responseData.bill}</h3>
            </> : ""
          }
        </div>
        </div>
        <div className="col-sm-4">
          {
            data.length ? <>
              <span style={{ fontSize: "20px" }} className='font-weight-bold text-success my-2'>Your order is eligible for FREE Delivery.</span>
              <h1 className='my-2'>Subtotal&#40;{data.length}&#41; : ₹{responseData.bill}</h1>
              <button className='btn btn-warning btn-lg btn-block my-2'>Proceed to Buy</button>
            </> : ""
          }
        </div>
      </div>
    </>
  )
}

export default Cart