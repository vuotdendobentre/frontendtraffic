import React, { Component } from 'react'
import SideBar from './Sidebar'
import DataBody from './DataBody'
import LiveBody from './LiveBody'
import ConfigUserBody from './ConfigUserBody'

export default class MainBody extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      onSide : 1
    }
  }
  componentWillMount(){
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
             this.state.onSide===2 ? <ConfigUserBody/> : <DataBody/>
  }
  render() {
    
    return (
      <div id="infoSection" className="container-fluid row">
        <SideBar onSideSelect={this.callBackFromChildBody} />
        <div id="info" className="col-sm-12 col-md-12 col-lg-10">
          {this.state.onSide===0 ? <h3>Giám Sát Trực Tuyến</h3> : this.state.onSide===1 ? <h3>Danh Sách Lỗi Vi Phạm</h3> :this.state.onSide===2 ? <h3>Quản Lý Tài Khoản</h3> : <h3>Danh Sách Lỗi Vi Phạm</h3>}
          {this.onRenderBody()}
        </div>
      </div>
    )
  }
}


