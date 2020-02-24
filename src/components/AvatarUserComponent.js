import React, { Component } from 'react'
import { connect } from 'react-redux'

class AvatarUserComponent extends Component {
    render() {
        return (
            <div>
                <a href="# " className="nav-link dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">{this.props.username}</span>
                    <img className="img-profile rounded-circle" src="./user_logo.png" />
                </a>

                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                    
                    <a 
                        href="# " 
                        className="dropdown-item"
                        onClick={()=>this.props.pageAction(3)}
                    >
                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                        Chỉnh sửa thông tin
                    </a>
                   
                    <div className="dropdown-divider" />
                    <a href="# " className="dropdown-item" data-toggle="modal" data-target="#logoutModal">
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                        Đăng xuất
                          </a>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.name
    }
}
const mapDispatchToProps = (dispatch,ownProps)=>{
    return {
        pageAction : (pageAction) =>{
            dispatch({
                type: "PAGE_ACTION",
                pageAction
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AvatarUserComponent)