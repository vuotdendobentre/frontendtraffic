import React, { Component } from 'react'
import {BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/Mainpage';
import {connect } from 'react-redux';
import PopupImage from './components/PopupImage'
import SuperAdmin from './pages/SuperAdmin'
class App extends Component {
  
 
  render() {
    console.log(this.props.username)
      return this.props.username ==='sAdmin' ? <SuperAdmin/> :
             (
              !this.props.isAuthenticate ? (
                <Router>
                  <Route component={LoginPage} />
                </Router>  
              ) : (
                <Router>
                  <Route exact component={MainPage} />
                
                </Router>
              )
             )
      //return <PopupImage/>
  }
}

const mapStateToProps = state =>{
  return {
    isAuthenticate : state.isAuthenticate,
    role : state.role,
    username : state.username
  }
}

export default connect(mapStateToProps)(App);
