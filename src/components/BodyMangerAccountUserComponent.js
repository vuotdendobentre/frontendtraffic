import React , { Component } from 'react'
import ProfileFormUserComponent from './ProfileFormUserComponent'
import callApi from '../apicall/apiCaller'
import { connect } from 'react-redux'

class BodyMangerAccountUserComponent extends Component { 

    constructor(props){
        super(props)
        this.state = { 
            data : {},
            getData : false
        }
    }

    componentWillMount(){
        callApi(`users/${this.props.username}`,'GET',{}).then(res=>{
         
            this.setState({
                data : res.data[0],
                getData:true
            })
        })
    }


    render(){
        return (
            <div className="container-fluid bg-gray-500">

            {/* Page Heading */}
            <h1 className="h3 mb-2 text-gray-800">Thông Tin cá nhân</h1>
            {/* <p className="mb-4">DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the <a target="_blank">official DataTables documentation</a>.</p> */}
            {/* DataTales Example */}
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Chỉnh sửa thông tin</h6>
                </div>
                <div className="card-body">
                    
                   {this.state.getData ?  <ProfileFormUserComponent value={this.state.data} /> :''}
                    
                </div>
            </div>

        </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        username: state.username
    }
}

export default connect(mapStateToProps)(BodyMangerAccountUserComponent)