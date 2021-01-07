import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Shop from './Components/Shop/Shop';
import Header from './Components/Header/Header'
import Home from './Components/Home/Home';
import Review from './Components/Review/Review';
import Inventory from './Components/Inventory/Inventory';
import NotFound from './Components/Not Found/NotFound';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import Auth from './Components/Auth/Auth';
import Shipment from './Components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
export const UserContext = createContext()
function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <UserContext.Provider value={[loggedIn, setLoggedIn]}>
      <Router>
        <Header />
        <Switch>
          <PrivateRoute exact path="/inventory">
            <Inventory />
          </PrivateRoute>
          <Route exact path="/review">
            <Review />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/product/:productKey">
            <ProductDetail />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment />
          </PrivateRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}
export default App;
