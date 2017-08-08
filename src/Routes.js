import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import NavBar from './components/navBar/navBar';
import SignIn from './contaiiners/signIn/signIn';
import SignUp from './contaiiners/signUp/signUp';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './components/main/main';
import Admin from './components/admin/admin';
import AddLocation from './components/admin/addLocation';
import ViewLocation from './components/user/viewLocation';
import ViewSlots from './components/user/viewSlots';
// import addBooking from './components/user/addBooking';



// Initialize Firebase
var config = {
  apiKey: "AIzaSyBLZ48pDni1zqBAUUkjs9Z-Zd1kJfDNTOE",
  authDomain: "real-time-car-booking-app.firebaseapp.com",
  databaseURL: "https://real-time-car-booking-app.firebaseio.com",
  projectId: "real-time-car-booking-app",
  storageBucket: "real-time-car-booking-app.appspot.com",
  messagingSenderId: "538508044291"
};
firebase.initializeApp(config);

class Routes extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router history={browserHistory}>
          <Route path='/' component={NavBar}>
            <IndexRoute component={SignIn} />
            <Route path='signup' component={SignUp} />
          </Route>
          <Route path='/main' component={Main} />
          <Route path='/admin' component={Admin} />
          <Route path='/addLocation' component={AddLocation} />
          <Route path='/viewLocation' component={ViewLocation} />
          <Route path='/viewslot' component={ViewSlots} /> 
          {/* <Route path='/addBooking' component={addBooking} />          */}
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default Routes;