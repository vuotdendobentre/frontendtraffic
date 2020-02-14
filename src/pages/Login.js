import React, { Component } from 'react'
import {connect} from 'react-redux'
import calApi from '../apicall/apiCaller'

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            username:'user1',
            password:'user1'
        }
    }

    onLogin = () =>{
        calApi('users/login','POST',{
            username:this.state.username,
            password:this.state.password
        }).then(res=>{
            if(res.data){
                if(res.data.success){
                    this.setState({
                        isLogin : true
                    })
                    this.props.onLogin(res.data.userame,parseInt(res.data.role),res.data.plate)
                
                    
                }
            }
        })
    }

    render() {
        return (
            <div className="container bg-gradient-primary">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                               
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Đăng Nhập</h1>
                                            </div>
                                            <form className="user">
                                                <div className="form-group">
                                                    <input type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                        <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                                                    </div>
                                                </div>
                                                <a onClick={()=>this.onLogin()}  className="btn btn-primary btn-user btn-block">
                                                    Login
                                                </a>
                                                <hr />
                                                <a onClick={()=>this.props.pageLogin(0),()=>this.props.pageAction(0)}  className="btn btn-google btn-user btn-block">
                                                    <i className="fas fa-arrow-left" /> Quay Về Trang Chủ
                                                </a>
                                            </form>
                                            <hr />
                                            <div className="text-center">
                                                <a className="small" >Forgot Password?</a>
                                            </div>
                                            <div className="text-center">
                                                <a className="small" >Create an Account!</a>
                                            </div>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps =(dispatch,ownProps)=>{
    return{
        pageLogin : (pageLogin)=>{
            dispatch({
                type:"PAGE_LOGIN",
                pageLogin
            })
        },
        pageAction:(pageAction)=>{
            dispatch({
                type:"PAGE_ACTION",
                pageAction
            })
        },
        onLogin : (username,role,plate)=>{
            dispatch({
                type : "IS_AUTHENTICATE",
                username,
                role,
                plate
               
            })
        }
    }
}

export default connect(null,mapDispatchToProps)(Login)