import React,{useEffect,useState} from 'react'

function Cart() {
  const [data, setData] = useState([])

    let newUser = JSON.parse(localStorage.getItem("user-info"))

   async function getCartDetails(){
let result = await fetch(`http://localhost:4000/api/getcartitem/${newUser.id}`)
result = await result.json();
// console.log(result)
setData(result.items)

    }

useEffect(() => {

  getCartDetails()  
}, [])

  return (
    <>

<div className="container my-2">
{data.length ? 
    <table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Quantity</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
    {
        data.map((item,index)=>(
<tr key={item}>
      <th scope="row">{index+1}</th>
      <td>{item.name}</td>
      <td>{item.quantity}</td>
      <td>{item.price}</td>
    </tr>

        )) 
    }
    
  </tbody>
</table>
:  <h1>No Products In the Cart</h1>

}
</div>

    </>
  )
}

export default Cart