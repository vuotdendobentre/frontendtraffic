import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './../components/Header'
import callApi from './../apicall/apiCaller'

class SuperAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            Blate : '',
            label : '',
            color : '',
            number : '',
            nameCar : '',
            username : '',
            password : '',
            nameUser : '',
            CMND : '',
            SDT : '',
            date : '',
            time : '',

        }
    }
    onChange = (events)=>{
        let name = events.target.name;
        let value = events.target.value;
        this.setState({
            [name]:value
        })
        console.log(this.state)
    }
    onReset = () =>{
        this.setState({
            Blate : '',
            label : '',
            color : '',
            number : '',
            nameCar : '',
            username : '',
            password : '',
            nameUser : '',
            CMND : '',
            SDT : '',
            date : '',
            time : '',
        })
    }
    onSubmit = () =>{
        callApi(`superadmin`,'POST',this.state).then(res=>{
            console.log(res.data)
        })
    }
    render() {
        return (
            <div id="container">
                <Header />
                <div id="infoSection" className="container-fluid row">
                    <div id="selector" className="col-lg-2 collapse d-md-block" style={{ width: '100%' }}>
                        <div id="adminButton" className="d-flex flex-column">
                            <button onClick={() => this.props.onLogout()} className="btn btn-secondary" style={{ margin: '1em 0' }}>LOGOUT</button>
                        </div>
                    </div>
                    <div id="info" className="col-sm-12 col-md-12 col-lg-5">
                        <form action="/action_page.php">
                            <div className="form-group">
                                <label htmlFor="text">Plate:</label>
                                <input value={this.state.Blate} name="Blate" onChange={(events)=>this.onChange(events)} type="text" className="form-control" id="text" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pwd">Label:</label>
                                <input value={this.state.label} name="label" onChange={(events)=>this.onChange(events)}  type="text" className="form-control" id="pwd" />
                            </div>
    
                            <div className="form-group">
                                <label htmlFor="text">Color:</label>
                                <input value={this.state.color} name="color" onChange={(events)=>this.onChange(events)} type="text" className="form-control" id="text" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pwd">Number:</label>
                                <input value={this.state.number} name="number" onChange={(events)=>this.onChange(events)} type="text" className="form-control" id="pwd" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pwd">NameCar:</label>
                                <input value={this.state.nameCar} name="nameCar" onChange={(events)=>this.onChange(events)} type="text" className="form-control" id="pwd" />
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="text">DateFail:</label>
                                <input value={this.state.date} name="date" onChange={(events)=>this.onChange(events)} type="text" className="form-control" id="text" />
                            </div> */}
                          
                        </form>
                        
                    </div>
                    <div id="info" className="col-sm-12 col-md-12 col-lg-5">
                        <form action="/action_page.php">
                            <div className="form-group">
                                <label htmlFor="text">Username:</label>
                                <input value={this.state.username} name="username" onChange={(events)=>this.onChange(events)} type="text" className="form-control" id="text" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pwd">Password:</label>
                                <input value={this.state.password} name="password" onChange={(events)=>this.onChange(events)} type="text" className="form-control" id="pwd" />
                            </div>
    
                            <div className="form-group">
                                <label htmlFor="text">NameUser:</label>
                                <input value={this.state.nameUser} name="nameUser" onChange={(events)=>this.onChange(events)} type="text" className="form-control" id="text" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pwd">CMND:</label>
                                <input value={this.state.CMND} name="CMND" onChange={(events)=>this.onChange(events)} type="text" className="form-control" id="pwd" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pwd">SDT:</label>
                                <input value={this.state.SDT} name="SDT" onChange={(events)=>this.onChange(events)} type="text" className="form-control" id="pwd" />
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="text">TimeFail:</label>
                                <input value={this.state.time} name="time" onChange={(events)=>this.onChange(events)} type="text" className="form-control" id="text" />
                            </div> */}
                            
                        </form>
                        <button onClick={()=>this.onReset()} type="button" className="float-right btn btn-danger">Reset</button>
                         <button onClick={()=>this.onSubmit()} type="button" className="float-right btn btn-primary">Submit</button>
                    </div>
                   
                </div>
                
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onLogout: () => {
            dispatch({
                type: "IS_LOGOUT",
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(SuperAdmin);