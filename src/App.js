import React, { Component } from 'react';
import Home from './pages/Home'
import Login from './pages/Login'
import { connect } from 'react-redux'
class App extends Component {


  onRenderMainPage = () =>{
    if(this.props.pageLogin){
      return <Login/>
    }
    return <Home/>
  }

  render(){
    return (
      <div className="App">
        {this.onRenderMainPage()}
      </div>
    );
  }
}


const mapStateToProps = state =>{
  return {
    pageLogin : state.pageLogin
  }
}

export default connect(mapStateToProps)(App);
