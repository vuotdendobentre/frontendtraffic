import React, { Component } from 'react'
import SideBarMain from './SideBarMain'
import DataBody from './DataBody'
import LiveBody from './LiveBody'
import ConfigUserBody from './ConfigUserBody'
import {connect} from 'react-redux';

class MainBody extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      onSide : 1
    }
  }
  componentWillUnmount(){
    this.setState({
      onSide :1
    })
  }
  callBackFromChildBody = (number)=>{
    this.setState({
      onSide : number
    })
  }
  onRenderBody(){
      return this.state.onSide===0 ? <LiveBody/> : 
             this.state.onSide===1 ? <DataBody/> :
             this.state.onSide===2 ? <ConfigUserBody/> : 
              this.state.onSide===3 ? this.props.onLogout() : <DataBody/>
  }
  render() {
    
    return (
      <div id="infoSection" className="container-fluid row">
        <SideBarMain onSideSelect={this.callBackFromChildBody} />
        <div id="info" className="col-sm-12 col-md-12 col-lg-10">
          {this.state.onSide===0 ? <h3>Giám Sát Trực Tuyến</h3> : this.state.onSide===1 ? <h3>Danh Sách Lỗi Vi Phạm</h3> :this.state.onSide===2 ? <h3>Quản Lý Tài Khoản</h3> : <h3>Danh Sách Lỗi Vi Phạm</h3>}
          {this.onRenderBody()}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch,ownProps)=>{
  return {
    onLogout : ()=>{
        dispatch({
            type : "IS_LOGOUT",   
        })
    }

  }
}


export default connect(null,mapDispatchToProps) (MainBody);


