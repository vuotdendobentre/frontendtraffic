import React, { Component } from 'react'
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import _ from 'lodash'
import callApi from '../apicall/apiCaller'

class ProfileCarFormComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addNew : false,
            _id : "",
            Plate: "",
            color: "",
            name: "",
            label: "",
            number: "",
            manaUsername:"",
            checkUsername : false
        };
    }

    componentWillMount() {
        if (!(_.isEmpty(this.props.value))) {
            let { Plate, color, name, label, number, manaUsername } = this.props.value
            this.setState({
          
                Plate,
                color,
                name,
                label,
                number,
                manaUsername
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
        let {addNew, Plate, color, name, label, number, manaUsername } = this.state
       
        if(Plate!=="" && color!=="" && name!=="" && label!=="" && number!=="" && manaUsername!==""){
            if(addNew){
                callApi(`cars`,'POST',{
                    Plate,color,name,label,number,manaUsername
                }).then(res=>{
                    this.props.getDataFromChild({addNew,data:res.data})
                })
            }else{
                callApi(`cars/${Plate}`,'PUT',{
                    Plate,color,name,label,number,manaUsername
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
        if(this.state.Plate!==""){
            callApi(`cars/findcar/${this.state.Plate}`,'POST',{}).then(res=>{
                this.setState({
                    checkUsername:res.data.status
                })
            })
        }
    }

    render() {

        return (
            <div>
                {this.state.checkUsername ? <label className="text-center" style={{color:"red"}}>Biển số đã tồn tại</label> : ''}
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
                                Biển số
                            </label>
                            <input
                                onBlur = {()=>this.onBlur()}
                                defaultValue={this.state.Plate}
                                name="Plate"
                                onChange={this.changeHandler}
                                type="text"
                                id="defaultFormRegisterNameEx"
                                className="form-control"
                                placeholder="Biển số"
                                disabled={!this.state.addNew ? 'disabled' : ''}
                            />
                            <div className="valid-feedback">Ok</div>
                        </MDBCol>
                        <MDBCol md="4" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterEmailEx2"
                                className="grey-text"
                            >
                                Màu sắc
                            </label>
                            <input
                                defaultValue={this.state.color}
                                name="color"
                                onChange={this.changeHandler}
                                type="text"
                                id="defaultFormRegisterEmailEx2"
                                className="form-control"
                                placeholder="Màu sắc"
                                required
                            />
                            <div className="valid-feedback">Ok</div>
                        </MDBCol>
                        <MDBCol md="4" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterConfirmEx3"
                                className="grey-text"
                            >
                                Tên xe
                            </label>
                            <input
                                defaultValue={this.state.name}
                                onChange={this.changeHandler}
                                type="name"
                                id="defaultFormRegisterConfirmEx3"
                                className="form-control"
                                name="name"
                                placeholder="Tên xe"
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
                                Hiệu
                            </label>
                            <input
                                defaultValue={this.state.label}
                                onChange={this.changeHandler}
                                type="text"
                                id="defaultFormRegisterPasswordEx4"
                                className="form-control"
                                name="label"
                                placeholder="Hiệu"
                                required
                            />

                            <div className="valid-feedback">Ok</div>
                        </MDBCol>
                        <MDBCol md="4" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterPasswordEx4"
                                className="grey-text"
                            >
                                Số khung
                            </label>
                            <input
                                defaultValue={this.state.number}
                                onChange={this.changeHandler}
                                type="text"
                                id="defaultFormRegisterPasswordEx4"
                                className="form-control"
                                name="number"
                                placeholder="Số khung"
                                required
                            />

                            <div className="valid-feedback">Ok</div>
                        </MDBCol>
                        <MDBCol md="4" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterPasswordEx4"
                                className="grey-text"
                            >
                                Tài khoản quản lý
                            </label>
                            <input
                                defaultValue={this.state.manaUsername}
                                onChange={this.changeHandler}
                                type="text"
                                id="defaultFormRegisterPasswordEx4"
                                className="form-control"
                                name="manaUsername"
                                placeholder="tên tài khoản"
                                
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

export default ProfileCarFormComponent;