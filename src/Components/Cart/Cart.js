import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css'
const Cart = ({ cart }) => {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    total = total + product.price * product.quantity || 1;
  }
  let shipping = 0;
  if (total > 35) {
    shipping = 0;
  } else if (total > 15) {
    shipping = 4.99;
  } else if (total > 0) {
    shipping = 12.99;
  }
  const tax = (total / 10).toFixed(2);
  const grandTotal = (total+shipping+ Number(tax)).toFixed(2)
  const formatNumber = (num) => {
    const precision = num.toFixed(2);
    return Number(precision)
  }
  return (
    <div >
      <div className="text-center">
        <h4>Order Summery</h4>
        <h6>Items Orderd: { cart.length}</h6>
      </div>
      <div>
        <p>Product Price: ${ formatNumber(total)}</p>
        <p>Shipping Cost: ${ shipping}</p>
        <p>TAX+VAT: ${tax} </p>
        <p>Total Price: ${grandTotal} </p>
      </div>
    </div>
  );
};

export default Cart;