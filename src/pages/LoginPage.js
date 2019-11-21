import React, { Component } from 'react';
import callApi from './../apicall/apiCaller';
import { connect } from 'react-redux';

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            username : '',
            password : '',
            isLogin : false
        }
    }

    onChange = event =>{
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    onSubmit = () =>{
        callApi(`users/login`,'POST',{
            username : this.state.username,
            password : this.state.password
        }).then(res=>{
            if(res.data){
                if(res.data.success){
                    this.setState({
                        isLogin : true
                    })
                    this.props.onLogin(res.data.userame,res.data.role,res.data.plate)
                    this.refreshPage()
                }
            }
        })
    }
 
 
    refreshPage() {
        window.location.reload(false);
    }


    render() {
        return (
            <div id="loginSection">
                <div style={{ display: 'flex', height: '100%', backgroundColor: 'azure', alignItems: 'center' }} className="align-bottom">
                    <form action="/main" className="mx-auto shadow p-3 mb-5 bg-white rounded" style={{ width: '40%', padding: '2em' }}>
                        <div className="form-group">
                            <label htmlFor="userName">User name</label>
                            <input onChange={(event)=>this.onChange(event)}  type="text" name="username"  className="form-control" id="userName" aria-describedby="emailHelp" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input onChange={(event)=>this.onChange(event)} type="password" name="password" className="form-control" id="password" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                            <input type="hidden" name="username" defaultValue />
                            <button type="button" onClick={()=>this.onSubmit()} className="btn btn-primary">
                                Login
                             </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch,ownProps)=>{
    return {
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

export default connect(null,mapDispatchToProps)(LoginPage);
