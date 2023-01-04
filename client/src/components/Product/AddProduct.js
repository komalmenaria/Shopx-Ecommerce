import React,{useState} from 'react';

function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageKey, setImageKey] = useState("");
  const token = localStorage.getItem("token");

async function addProduct(event){
  event.preventDefault();
  let product = {title , price , description, category, imageKey}
  console.log(product)
  const formData = new FormData();
  formData.append("title",title);
  formData.append("price",price);
  formData.append("description",description);
  formData.append("category",category);
  formData.append("imageKey",imageKey);

try{

 
      await fetch("http://localhost:4000/api/addItem" , {
      method: 'POST',headers: {
        "x-auth-token": token
      },
      
      body: formData }).then(async (result) => {
        if (result.status == 200) {
            result = await result.json();
            document.getElementById('close-modal').click();
        }else{
          result = await result.json()
          alert(result.msg)
         
        }
})
}
catch(error ){
  console.log('error', error)} 
}

  return (
    <>
  
<button type="button" className="btn btn-primary m-1" data-toggle="modal" data-target="#exampleModal">
  Add Product
</button>


<div className="modal fade" id="exampleModal" tabndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add Product</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <div className="form-group">
    <label htmlFor="title">Product Name</label>
    <input type="text" className="form-control" onChange={(e) =>setTitle(e.target.value)} id="title" />
  </div>
  <div className="form-group">
    <label htmlFor="description">Product Description</label>
    <input type="text" className="form-control" onChange={(e) =>setDescription(e.target.value)} id="description" />
  </div>
  <div className="form-group">
    <label htmlFor="price">Product Price</label>
    <input type="text" className="form-control" onChange={(e) =>setPrice(e.target.value)} id="price" />
  </div>
  <div className="form-group">
    <label htmlFor="category">Product Category</label>
    <input type="text" className="form-control" onChange={(e) =>setCategory(e.target.value)} id="category" />
  </div>
  <div className="form-group">
    <label htmlFor="imageKey">Product Image</label>
    <input type="file" className="form-control" onChange={(e) =>setImageKey(e.target.files[0])} id="imageKey" />
  </div>

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" id="close-modal" data-dismiss="modal">Close</button>
        <button type="button" onClick={addProduct} className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    
    </>
  )
}

export default AddProduct