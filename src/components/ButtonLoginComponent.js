import React, { Component } from 'react'
import { connect } from 'react-redux'

class ButtonLoginComponent extends Component {
    render() {
       
        return (
            <a onClick={()=>this.props.pageLogin(1)} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                          <i className="fas fa-sign-in-alt fa-sm text-white-50" /> Login</a>
        )
    }
}

const mapDispatchToProps = (dispatch,ownProps)=>{
    return {
        pageLogin:(pageLogin)=>{
            dispatch({
                type:"PAGE_LOGIN",
                pageLogin
            })
        }
    }
}

export default connect(null,mapDispatchToProps)(ButtonLoginComponent)