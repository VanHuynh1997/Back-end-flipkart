import React, { useEffect } from 'react';
import {BrowserRouter as Switch,Route} from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/HOC/PrivateRoute';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import {useDispatch,useSelector} from 'react-redux'
import { isUserLoggedIn } from './actions';
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';
function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state=>state.auth);
  useEffect(() => {
    if(!auth.authenticate){
        dispatch(isUserLoggedIn())
    }
  }, []);

  return (
      <Switch>
        <PrivateRoute path='/' exact component={Home}/>
        <PrivateRoute path='/category' component={Category}/>
        <PrivateRoute path='/products' component={Products}/>
        <PrivateRoute path='/orders' component={Orders}/>
        <Route path='/signin' component={Signin}/>
        <Route path='/signup' component={Signup}/>
      </Switch>
  );
}

export default App;
