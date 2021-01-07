import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
  const [cart, setCart] = useState([]);

  const [orderPlaced, setOrderPlaced] = useState(false);
  const history = useHistory()
  const procedCheckout = () => {
    // processOrder();
    history.push('/shipment')
    // setCart([])
    // setOrderPlaced(true)
  }

  const removeProduct = (productKey) => {
    const newCart = cart.filter(pd => pd.key !== productKey)
    setCart(newCart);
    removeFromDatabaseCart(productKey)
  }
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart)

    fetch('http://localhost:4000/productsByKeys', {
      method: 'Post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productKeys)

    })
      .then(res => res.json())
      .then(data => setCart(data))
  }, []);

  let thankYou;
  if (orderPlaced) {
    thankYou = <img src={happyImage} alt="" />
  }
  return (
    <Container style={{ marginTop: '70px' }}>
      <Row>
        <Col sm={12} md={9}>
          {
            cart.map(pd => <ReviewItem
              product={pd}
              removeProduct={removeProduct}
            />)
          }
          {thankYou}
        </Col>
        <Col sm={12} md={3}>
          <Cart cart={cart} />
          <button
            onClick={procedCheckout}
            className="cart_button"> Proced CheckOut</button>
        </Col>
      </Row>
    </Container>
  );
};

export default Review;