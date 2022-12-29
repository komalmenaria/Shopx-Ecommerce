import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import UpdateProduct from "./UpdateProduct";

import AddProduct from "./AddProduct";

function DetailProduct() {
  const Navigation = useNavigate();
  const [data, setData] = useState([])
const [productId , setProductId] =useState(null)
const [isUpdated , setIsUpdated] =useState(false)

  async function fetchData() {
    let result = await fetch("http://localhost:4000/api/items");
    result = await result.json();
    setData(result)
  }

  async function deleteProduct(id){
await fetch(`http://localhost:4000/api/items/${id}` ,{
    method:"DELETE"
}).then(result => {
    console.log(result.json())
    fetchData()
}
)
.catch(error => console.log('error', error));
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Navigation("/login")
    } else {
      fetchData();
      setIsUpdated(false)
    }
    //  console.log(data)


  }, [isUpdated]);


  return (
    <>
    <div className="container mt-3">
        <h1 className="text-center">All Products</h1>
<div className="container d-flex my-2">
<AddProduct />
< UpdateProduct id={productId} setIsUpdated={setIsUpdated} />

</div>
        <table className="table">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Category</th>
      <th scope="col">Image</th>
      <th scope="col">Operation</th>
    </tr>
  </thead>
  <tbody>
    {
    data.length ? data.map((item,index)=>(
        
        <tr key={item._id}>
        <th scope="row">{index + 1}</th>
        <td>{item.title}</td>
        <td>{item.price}</td>
        <td>{item.category}</td>
        <td> <img src={item.imageKey} alt={item.title} style={{width:"50px"}}  /> </td>
        <td> <button className='btn btn-danger' onClick={()=>deleteProduct(item._id)}>Delete</button>
     
       <button type="button"  className="btn btn-success m-1" onClick={()=>{
        setProductId(item._id)
       }} data-toggle="modal" data-target="#updateMOdal">
      Update 
    </button>
         </td>
      </tr>
    ))
      
      : "no products"
    }
  
  </tbody>
</table>
    </div>
    </>
  )
}

export default DetailProduct