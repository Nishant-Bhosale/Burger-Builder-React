import './App.css';
import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
// import Burger from './components/Burger/Burger';
import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import CheckoutData from './containers/Checkout/ContactData/CheckoutData';
import Myorder from './containers/MyOrders/MyOrder';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignUp();
  }

  render(){
    let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />  
      <Route path="/" exact component={BurgerBuilder} />       
      <Redirect to='/' />
    </Switch>
    )

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path= '/contact-data' component={CheckoutData} />
          <Route path='/orders' component={Myorder} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />  
          <Route path="/" exact component={BurgerBuilder} />       
        <Redirect to='/' />
      </Switch>          
      )

    }
    return (
      <div className="App">

        <Layout>
          {routes}
        </Layout>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
