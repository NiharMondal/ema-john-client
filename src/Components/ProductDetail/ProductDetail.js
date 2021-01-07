import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
  const { productKey } = useParams();
  const [product, setProduct]=useState({})
  useEffect(() => {
    fetch('http://localhost:4000/product/'+productKey)
      .then(res => res.json())
    .then(data=>setProduct(data ))
  },[productKey])
  // const product = fakeData.find(pd => pd.key === productKey);
  return (
    <div >
      <Container style={{ marginTop: '70px' }}>
        <Product
          showAddToCart={false}
          product={product}
        />
      </Container>
    
    </div>
  );
};

export default ProductDetail;