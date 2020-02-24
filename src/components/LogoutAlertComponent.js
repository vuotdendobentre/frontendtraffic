
import React, { Component } from 'react'
import {connect} from 'react-redux'

class LogoutAlertComponent extends Component {
    render() {
        return (
            <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Bạn muôn đăng xuất?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        {/* <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div> */}
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Hủy</button>
                            <a 
                                href="# "
                                onClick={
                                        ()=>this.props.onLogout()   
                                    } 
                                    data-dismiss="modal" 
                                    className="btn btn-primary" 
                                >Xác nhận</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch,ownProps) =>{
    return {
        onLogout : ()=>{
            dispatch({
                type:"IS_LOGOUT"
            })
        },
        pageAction:(pageAction)=>{
            dispatch({
                type:"PAGE_ACTION",
                pageAction
            })
        },
        pageLogin:(pageLogin)=>{
            dispatch({
                type:"PAGE_LOGIN",
                pageLogin
            })
        }
    }
}

export default connect(null,mapDispatchToProps)(LogoutAlertComponent)
