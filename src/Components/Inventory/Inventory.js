import React from 'react';
import './Inventory.css'
const Inventory = () => {

  const handleProduct = () => {
    const product ={}
    fetch('http://localhost:4000/addProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
  }
  return (
    <div className="inventory" style={{ marginTop: '70px' }}>
      <form className="addItemForm">
        <input type="text" name="" id="" placeholder="Product Name" /> <br/>
        <input type="text" name="" id="" placeholder="Price" /> <br />
        <input type="file" name="" id=""/><br/>
        <button onClick={handleProduct}> Add product</button>
      </form>
     
    </div>
  );
};

export default Inventory;