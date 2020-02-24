import React, { Component } from 'react'
import {connect} from 'react-redux'

class SideBarComponent extends Component {

   onRenderUser(){
       return this.props.role ===1 ? <a href="# " onClick={()=>this.props.pageAction(2)}className="collapse-item" >Biểu Đồ Cá Nhân</a> : ''
   }

    render() {
        return (

            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                <a href="# " className="sidebar-brand d-flex align-items-center justify-content-center" >
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-traffic-light"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">SmartTraffic </div>
                </a>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">
                    <a href="# " onClick={()=>this.props.pageAction(0)} className="nav-link" >
                        <i className="fas fa-fw fa-home" />
                        <span>Trang Chủ</span>
                    </a>
                </li>

                <hr className="sidebar-divider" />

                <li className="nav-item">
                    <a href="# " className="nav-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-fw fa-cog" />
                        <span>Quản Lý Lỗi</span>
                    </a>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">

                            <a href="# " onClick={()=>this.props.pageAction(1)} id="renderTable" className="collapse-item" >{this.props.role ===1 ?'Xem Lỗi Cá Nhân':'Danh sách lỗi vi phạm'}</a>
                            {this.onRenderUser()}
                        </div>
                    </div>
                </li>

                <li className="nav-item">
                    <a href="# " className="nav-link collapsed" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fas fa-fw fa-wrench" />
                        <span>Quản Lý Tài Khoản</span>
                    </a>
                    <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">

                            {this.props.role===0 ? <a href="# " onClick={()=>this.props.pageAction(4)} className="collapse-item" >Danh Sách Tài Khoản</a> : ''}
                            <a href="# " onClick={()=>this.props.pageAction(3)} className="collapse-item" >Thông tin cá nhân</a>
                            <a href="# " className="collapse-item" data-target="#logoutModal" data-toggle="modal" >Đăng Xuất</a>

                        </div>
                    </div>
                </li>

            </ul>

        )
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

const mapStateToProps = state =>{
    return {
        isAuthenticate:state.isAuthenticate,
        role : state.role
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SideBarComponent);