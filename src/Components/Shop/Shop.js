import React, { useEffect, useState } from 'react'
import './Shop.css'
import { Container, Row, Col } from 'react-bootstrap'
import Product from '../Product/Product'
import Cart from '../Cart/Cart'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager'
import { Link } from 'react-router-dom'
const Shop = () => {
  // const first10 = fakeData.slice(0, 10)
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('https://young-mesa-84664.herokuapp.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])
  useEffect(() => {
    const savedCart = getDatabaseCart()
    const productKeys = Object.keys(savedCart)
    fetch('https://young-mesa-84664.herokuapp.com/productsByKeys', {
      method: 'Post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productKeys)

    })
      .then(res => res.json())
      .then(data => setCart(data))
  }, [products])

  const handleAddProduct = (product) => {
    const toBeAddedKey = product.key;
    const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter(pd => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct]
    }
    else {
      product.quantity = 1;
      newCart = [...cart, product];
    }

    setCart(newCart);
    addToDatabaseCart(product.key, count)
  }

  return (
    <Container fluid style={{ marginTop: '25px' }} className="p-5">
      <Row >
        <Col sm={12} md={9} >
          {
            products.map(pd => <Product
              key={pd.key}
              showAddToCart={true}
              product={pd}
              showAddToCart={true}
              handleAddProduct={handleAddProduct}
            />)
          }
        </Col>
        <Col sm={12} md={3}>
          <Cart cart={cart} />
          <Link to="/review">
            <button className="cart_button">Review Order</button>
          </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default Shop
