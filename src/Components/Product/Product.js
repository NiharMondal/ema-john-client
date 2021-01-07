import React from 'react';
import './Product.css'
import { Row,Col } from 'react-bootstrap';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
const Product = ({product,handleAddProduct,showAddToCart}) => {
 const {key, img, seller, stock, name,price } = product;
  return (
    <div>
      <Row>
        <Col sm={12} md={4} >
          <img style={{width:'150px'}} src={img} alt="" />
        </Col>
        <Col sm={12} md={8}>
          <h6><Link to={'/product/'+key}>{ name}</Link></h6>
          <p> <small>by: {seller}</small> </p>
          <p> ${price} </p>
          <p>Only {stock} left -order soon</p>
        { showAddToCart && <button
            onClick={()=> handleAddProduct(product)}
            className="cart_button"><FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
          </button>}
        </Col>
      </Row>
      <hr/>
    </div>
    
  
  );
};

export default Product;