import React, { Component } from 'react'
import { connect } from 'react-redux'
import calApi from '../apicall/apiCaller'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loginState:0
        }
    }

    onLogin = () => {
        let {username,password} = this.state;
        if(username!==''&&password!==''){
            calApi('users/login', 'POST', {
                username: this.state.username,
                password: this.state.password
            }).then(res => {
                if (res.data) {
                    if (res.data.success) {
                        this.setState({
                            usernameState:-1,
                            passwordState:-1
                        })
                        console.log(res.data)
                        this.props.onLogin(this.state.username, parseInt(res.data.role), res.data.plate,res.data.name)
    
                    }else{
                        this.setState({
                            loginState:1
                        })
                    }
                }
            })
          
        }
        
    }

    onChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value,
        })

    }

    onFail = ()=>{
        return (
            <a    className="btn btn-danger btn-circle btn-lg">
                <i className="fas fa-times"></i>
            </a>
        )
    }
    
    onSucess = () =>{
       return(
        <a    className="btn btn-success btn-circle btn-lg">
             <i className="fas fa-check"></i>
        </a>
       )
    }

    onLoginFail = () =>{
        return (
            <a   onClick={()=>this.setState({loginState:0})} className="btn btn-danger btn-icon-split">
            <span className="icon text-white-50">
              <i className="fas fa-times" />
            </span>
            <span className="text text-white-50">Sai tên đăng nhập hoặc mật khẩu</span>
          </a>
        )
    }

    onKeyPress = (event)=>{
        if(event.key ==='Enter'){
            this.onLogin();
        }
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
                                                    {this.state.loginState?this.onLoginFail():''}
                                                </div>
                                                <div className="form-group">
                                                    <div className="row no-gutters align-items-center">                                        
                                                        <input onChange={(event) => this.onChange(event)} type="text" className=" col mr-2 form-control form-control-user" name="username" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Tên đăng nhập..." />
                                                        {this.state.username!==''?this.onSucess():this.onFail()}
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="row no-gutters align-items-center"> 
                                                        <input  onKeyPress ={(event)=>this.onKeyPress(event)} onChange={(event) => this.onChange(event)} type="password" className=" col mr-2 form-control form-control-user" name="password" id="exampleInputPassword" placeholder="Mật Khẩu" />
                                                        {this.state.password!==''?this.onSucess():this.onFail()}
                                                    </div>
                                                </div>
                                                {/* <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                        <label className="custom-control-label" htmlFor="customCheck">Ghi nhớ</label>
                                                    </div>
                                                </div> */}
                                                <a   onClick={() => this.onLogin()} className="btn btn-primary btn-user btn-block">
                                                    Login
                                                </a>
                                                <hr />
                                                <a   onClick={() => this.props.pageLogin(0), () => this.props.pageAction(0)} className="btn btn-google btn-user btn-block">
                                                    <i className="fas fa-arrow-left text-white-50" /> Quay Về Trang Chủ
                                                </a>
                                            </form>
                                            <hr />
                                            <div className="text-center">
                                                <a   className="small" >Forgot Password?</a>
                                            </div>
                                            <div className="text-center">
                                                <a   className="small" >Create an Account!</a>
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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        pageLogin: (pageLogin) => {
            dispatch({
                type: "PAGE_LOGIN",
                pageLogin
            })
        },
        pageAction: (pageAction) => {
            dispatch({
                type: "PAGE_ACTION",
                pageAction
            })
        },
        onLogin: (username, role, plate,name) => {
            dispatch({
                type: "IS_AUTHENTICATE",
                username,
                role,
                plate,
                name

            })
        }
    }
}

export default connect(null, mapDispatchToProps)(Login)