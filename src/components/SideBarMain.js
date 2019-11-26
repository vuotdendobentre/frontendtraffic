import React, { Component } from 'react'
import { connect } from 'react-redux'
class SideBarMain extends Component {

    onClick = number =>{
        //console.log(number)
        this.props.onSideSelect(number)
    }
    render() {
        return (
            <div id="selector" className="col-xs-12 col-sm-12 col-lg-2 collapse d-md-block" style={{width: '100%'}}>
                <div id="adminButton" className="d-flex flex-column">
                    {/* {
                      this.props.role === 0 ?<button onClick={()=>this.onClick(0)} className="btn btn-secondary" style={{margin: '1em 0'}}>LIVE</button>: ''
                    } */}
                     <button onClick={()=>this.onClick(1)} className="btn btn-secondary" style={{margin: '1em 0'}}>DATA</button>
                    {
                      this.props.role === 0 ?<button onClick={()=>this.onClick(2)} className="btn btn-secondary" style={{margin: '1em 0'}}>CONFIG USERS</button> : ''
                    }
                    <button onClick={()=>this.onClick(3)} className="btn btn-secondary" style={{margin: '1em 0'}}>LOGOUT</button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return {
      username : state.username,
      role: state.role
    }
  
}
export default  connect(mapStateToProps)(SideBarMain);