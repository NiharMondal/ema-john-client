import React from 'react';
import { Col, Row } from 'react-bootstrap';

const ReviewItem = ({ product,removeProduct }) => {
  const { name, quantity,img,key,price } = product;

  return (
    <Row style={{padding: '8px 0'}}>
      <Col sm={12} md={4}>
        <img style={{width:'150px'}} src={img} alt=""/>
        
      </Col>
      <Col sm={12} md={8}>
        <h5>{ name}</h5>
        <p>Quantity: {quantity} </p>
        <p>Price: { price}</p>
        <button
          onClick={()=> removeProduct(key)}
          className="cart_button">Remove Item</button>
      </Col>
    </Row>
  );
};

export default ReviewItem;