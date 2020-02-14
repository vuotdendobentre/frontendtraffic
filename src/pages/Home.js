import React, { Component } from 'react'
import SideBarComponent from '../components/SideBarComponent'
import NavigationComponent from '../components/NavigationComponent'
import BodyComponent from '../components/BodyComponent'
import BodyUserComponent from '../components/BodyUserComponent'
import FooterComponent from '../components/FooterComponent'
import LogoutAlertComponent from '../components/LogoutAlertComponent'
import BodyTableComponent from '../components/BodyTableComponent'
import BodyMangerAccountComponent from '../components/BodyMangerAccountComponent'
import { connect } from 'react-redux'

class Home extends Component {

  

  //Điều hướng page                      
  onRenderBody = ()=>{
    switch(this.props.pageAction){
      case 0 :
        return <BodyComponent/>
      case 1 :
        return <BodyTableComponent/>
      case 2 : 
        return <BodyUserComponent/>
      case 3 : 
        return <BodyMangerAccountComponent/>
      // default :
      //   return <BodyComponent/>
    }
  }

  
  render() {
   
    return (
      <div>
        <div id="wrapper">
          <SideBarComponent />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <NavigationComponent />
              {this.onRenderBody()}
            </div>
            <FooterComponent />
          </div>
        </div>
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up" />
        </a>
        <LogoutAlertComponent />
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    pageAction : state.pageAction,
    isAuthenticate : state.isAuthenticate
  }
}


export default connect(mapStateToProps)(Home);