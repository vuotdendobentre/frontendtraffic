import React, { Component } from 'react'
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import _ from 'lodash'
import callApi from '../apicall/apiCaller'

class ProFileFormComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addNew : false,
            _id : "",
            username: "",
            password: "",
            name: "",
            CMND: "",
            SDT: "",
            Plate:"",
            checkUsername : false
        };
    }

    componentWillMount() {
        if (!(_.isEmpty(this.props.value))) {
            let { username, password, name, CMND, SDT, Plate } = this.props.value
            this.setState({
          
                username,
                password,
                name,
                CMND,
                SDT,
                Plate: Plate.join(',')
            })
        }else{
            this.setState({
                addNew:true
            })
        }
    }

    


    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";
        let {addNew, username, password, name, CMND, SDT, Plate } = this.state
       
        if(username!=="" && password!=="" && name!=="" && CMND!=="" && SDT!=="" && Plate!==""){
            Plate=Plate.split(',')
            if(addNew){
                callApi(`users`,'POST',{
                    username,password,name,CMND,SDT,Plate,rule:1
                }).then(res=>{
                    this.props.getDataFromChild({addNew,data:res.data})
                })
            }else{
                callApi(`users/${username}`,'PUT',{
                    username,password,name,CMND,SDT,Plate,rule:1
                }).then(res=>{
                    this.props.getDataFromChild({addNew,data:res.data})
                })
            }

        }
    };

    changeHandler = event => {
        if(this.state.checkUsername){
            this.setState({
                checkUsername:false
            })
        }
     
        this.setState({ [event.target.name]: event.target.value });
    };

    onBlur = () =>{
        if(this.state.username!==""){
            callApi(`users/finduser/${this.state.username}`,'POST',{}).then(res=>{
                this.setState({
                    checkUsername:res.data.status
                })
            })
        }
    }

    render() {

        return (
            <div>
                {this.state.checkUsername ? <label className="text-center" style={{color:"red"}}>Tên tài khoản đã tồn tại</label> : ''}
                <form
                    className="needs-validation"
                    onSubmit={this.submitHandler}
                    noValidate
                >
                    <MDBRow>
                        <MDBCol md="4" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterNameEx"
                                className="grey-text"
                            >
                                Tên tài khoản
                            </label>
                            <input
                                onBlur = {()=>this.onBlur()}
                                defaultValue={this.state.username}
                                name="username"
                                onChange={this.changeHandler}
                                type="text"
                                id="defaultFormRegisterNameEx"
                                className="form-control"
                                placeholder="Tên tài khoản"
                                disabled={!this.state.addNew ? 'disabled' : ''}
                            />
                            <div className="valid-feedback">Ok</div>
                        </MDBCol>
                        <MDBCol md="4" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterEmailEx2"
                                className="grey-text"
                            >
                                Mật khẩu
                            </label>
                            <input
                                defaultValue={this.state.password}
                                name="password"
                                onChange={this.changeHandler}
                                type="text"
                                id="defaultFormRegisterEmailEx2"
                                className="form-control"
                                placeholder="Mật khẩu"
                                required
                            />
                            <div className="valid-feedback">Ok</div>
                        </MDBCol>
                        <MDBCol md="4" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterConfirmEx3"
                                className="grey-text"
                            >
                                Name
                            </label>
                            <input
                                defaultValue={this.state.name}
                                onChange={this.changeHandler}
                                type="name"
                                id="defaultFormRegisterConfirmEx3"
                                className="form-control"
                                name="name"
                                placeholder="Họ và tên"
                                required
                            />
                            <div className="valid-feedback">Ok</div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="4" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterPasswordEx4"
                                className="grey-text"
                            >
                                CMND
                            </label>
                            <input
                                defaultValue={this.state.CMND}
                                onChange={this.changeHandler}
                                type="text"
                                id="defaultFormRegisterPasswordEx4"
                                className="form-control"
                                name="CMND"
                                placeholder="CMND"
                                required
                            />

                            <div className="valid-feedback">Ok</div>
                        </MDBCol>
                        <MDBCol md="4" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterPasswordEx4"
                                className="grey-text"
                            >
                                SDT
                            </label>
                            <input
                                defaultValue={this.state.SDT}
                                onChange={this.changeHandler}
                                type="text"
                                id="defaultFormRegisterPasswordEx4"
                                className="form-control"
                                name="SDT"
                                placeholder="Số điện thoại"
                                required
                            />

                            <div className="valid-feedback">Ok</div>
                        </MDBCol>
                        <MDBCol md="4" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterPasswordEx4"
                                className="grey-text"
                            >
                                Biển số
                            </label>
                            <input
                                defaultValue={this.state.Plate}
                                onChange={this.changeHandler}
                                type="text"
                                id="defaultFormRegisterPasswordEx4"
                                className="form-control"
                                name="Plate"
                                placeholder="Biển số"
                                
                            />

                            <div className="valid-feedback">Ok</div>
                        </MDBCol>
                    </MDBRow>
                    {/* <MDBCol md="4" className="mb-3">
                <div className="custom-control custom-checkbox pl-3">
                  <input
                    className="custom-control-input"
                    type="checkbox"
                    value=""
                    id="invalidCheck"
                    required
                  />
                  <label className="custom-control-label" htmlFor="invalidCheck">
                    Agree to terms and conditions
                  </label>
                  <div className="invalid-feedback">
                    You must agree before submitting.
                  </div>
                </div>
              </MDBCol> */}
                    <MDBBtn color="primary" type="submit">
                        Xác nhận
                    </MDBBtn>
                </form>
            </div>
        )
    }
}

export default ProFileFormComponent;