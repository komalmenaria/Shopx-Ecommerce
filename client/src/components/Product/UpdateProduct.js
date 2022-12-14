import React,{useState,useEffect} from 'react';
import { useAlert } from "react-alert";
import Spinner from '../Spinner';



function UpdateProduct({id,setIsUpdated}) {
  const [loading, setLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);

  const alert = useAlert();

const [title, setTitle] = useState("");
const [price, setPrice] = useState("");
const [description, setDescription] = useState("");
const [category, setCategory] = useState("");
const [imageKey, setImageKey] = useState("");
const token = localStorage.getItem("token");

async function getProductDetails(productId){
  try {
    setLoading(true)
    let result = await fetch(`http://localhost:4000/api/getItem/${productId}`,{
    headers: {
      "x-auth-token": token
    }
  });
  result = await result.json();
  console.log(result)
  setTitle(result.title)
  setPrice(result.price)
  setDescription(result.description)
  setCategory(result.category)
  setImageKey(result.imageKey)
  setLoading(false)

  } catch (error) {
    console.log(error)
    alert.error(error)
  }
}





async function updateProduct(event){
event.preventDefault();
console.log(id)
let product = {title , price , description, category, imageKey}
console.log(product)
const formData = new FormData();
formData.append("title",title);
formData.append("price",price);
formData.append("description",description);
formData.append("category",category);
formData.append("imageKey",imageKey);

console.log(formData)
try {
  setBtnLoading(true)
 let result = await fetch(`http://localhost:4000/api/updateItem/${id}` , {
      method: 'PUT',
      headers: {
        "x-auth-token": token
      },
      body: formData });

      if (result.status == 200) {
        setBtnLoading(false);
        alert.success("Product updated successfully")
        result = await result.json();
        document.getElementById('close-modal-2').click();
        setIsUpdated(true)

    }else{
      result = await result.json()
      alert.error(result.msg)
     
    }
} catch (error) {
  console.log('error', error)
  alert.error(error)
}

}

useEffect(()=>{
if(id){
  getProductDetails(id)
}
},[id])
  return (
    <>
  
    {/* <button type="button" onClick={getProductDetails} className="btn btn-success m-1" data-toggle="modal" data-target={modalId}>
      Update 
    </button> */}
    
    
    <div className="modal fade" id="updateMOdal" tabndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Update Product</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {loading ? <Spinner /> :   <div className="modal-body">
          <div className="form-group">
        <label htmlFor="title">Product Name</label>
        <input type="text" className="form-control" onChange={(e) =>{setTitle(e.target.value)}} value={title} id="title" />
      </div>
      <div className="form-group">
        <label htmlFor="description">Product Description</label>
        <input type="text" className="form-control" onChange={(e) =>setDescription(e.target.value)} value={description} id="description" />
      </div>
      <div className="form-group">
        <label htmlFor="price">Product Price</label>
        <input type="text" className="form-control" onChange={(e) =>setPrice(e.target.value)} value={price} id="price" />
      </div>
      <div className="form-group">
        <label htmlFor="category">Product Category</label>
        <input type="text" className="form-control" onChange={(e) =>setCategory(e.target.value)} value={category} id="category" />
      </div>
      <div className="form-group">
        <label htmlFor="imageKey">Product Image</label>
        <input type="file" className="form-control" onChange={(e) =>setImageKey(e.target.files[0])} accept=".jpg , .jpeg, .png"  id="imageKey" />
        <img src={imageKey} alt={title} style={{width:"100px"}} className="mt-3" />
      </div>
    
          </div> }
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" id="close-modal-2" data-dismiss="modal">Close</button>
          {btnloading ? < Spinner /> :   <button type="button" onClick={updateProduct} className="btn btn-primary">Save changes</button> }
          </div>
        </div>
      </div>
    </div>
        
        </>
  )
}

export default UpdateProduct