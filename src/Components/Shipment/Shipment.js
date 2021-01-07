import { Container } from '@material-ui/core';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css'
const Shipment = () => {
  const [loggedIn, setLoggedIn]=useContext(UserContext)
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    const savedCart = getDatabaseCart()
    const orderDetails = { ...loggedIn, products: savedCart, shipment: data, orderTime:new Date() }
    fetch('http://localhost:4000/addOrder', {
      method: 'Post',
      headers: {
        "content-type":"application/json"
      }, 
      body: JSON.stringify(orderDetails)
    }).then(res => res.json())
      .then(data => {
        if (data) {
          processOrder()
        alert('Your order placed successfully')
      }
    })
  }

  return (
    <Container style={{marginTop:'70px'}}>
      <form
        className="ship-form"
        form onSubmit={handleSubmit(onSubmit)} >
        
        < input name="name" defaultValue={loggedIn.name} ref={register({required: true})} placeholder="Your Name"/>
        {errors.name && <span className="error">Name is required</span>}
        
        < input name="email" defaultValue={loggedIn.email}
          ref={register({ required: true })} placeholder="Your Email" />
        {errors.email && <span className="error">Email is required</span>}

        < input name="address" ref={register({ required: true })} placeholder="Your Address" />
        {errors.address && <span className="error">Address is required</span>}

        < input name="phone" ref={register({ required: true })} placeholder="Phone Number" />
        {errors.phone && <span className="error">Phone number is required</span>}
        <input type="submit" />
      </form >
    </Container>
  );
};

export default Shipment;