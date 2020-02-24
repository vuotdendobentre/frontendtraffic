import React, { Component,Fragment } from 'react'
import { MDBDataTable, MDBBtn, MDBIcon, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer } from 'mdbreact'
import  ProFileFormComponent from './ProFileFormComponent'
import callApi from '../apicall/apiCaller'
import _ from 'lodash'

const data1 = {
  columns: [
    {
      label: 'Tên tài khoản',
      field: 'username',
      sort: 'asc',
      width: 270
    },
    {
      label: 'Mật khẩu',
      field: 'password',
      sort: 'asc',
      width: 200
    },
    {
      label: 'Tên',
      field: 'name',
      sort: 'asc',
      width: 100
    },
    {
      label: 'CMND',
      field: 'CMND',
      sort: 'asc',
      width: 100
    },
    {
      label: 'SDT',
      field: 'SDT',
      sort: 'asc',
      width: 100
    },
    {
      label: 'Biển số',
      field: 'Plate',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Hành động',
      field: 'btn',
      width: 50,
      sort: false,
    }
  ],
  rows: [

  ]
}


class BodyMangerAccountAdminComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: data1,
      modal: false,
      modal1: false,
      dataImg: '',
      valueToggle :{},
      valueDelete:{}
    }
  }

  onDelete = (value) =>{
  
    callApi(`users/${value.username}`,'DELETE',{}).then(res=>{
      let index = this.state.data.rows.findIndex((el)=>{
        return el._id === value._id
      })
      this.state.data.rows.splice(index,1)
      this.setState({
        data: {
          columns: [...data1.columns],
          rows: [...this.state.data.rows]
        }
      })
      this.toggle1()

    })
  }
  stateValueDelete = (value) =>{
    this.toggle1()
    this.setState({
      valueDelete:value
    })

  }
  onClick = (value) => {
    this.toggle()
    this.setState({
      valueToggle:value,
     
    });
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }
  toggle1 = () => {
    this.setState({
      modal1: !this.state.modal1
    })
  }

  onPlate = (Plate) =>{
    let result = ''
    result = Plate.map((value,index)=>{
      return <li>{value}</li>
    })

    return result 
  }
  


  standardData = (dataContainer) => {
    let result = []
    result = dataContainer.map((value, index) => {
  
      return value.rule ===1 ?  Object.assign({}, { 
        ...value,
      Plate:<ul>{this.onPlate(value.Plate)}</ul>
      }, {
        btn:  <Fragment>
                <MDBIcon onClick={()=>this.onClick(value)} icon="edit" className="mr-2" />
                <MDBIcon onClick={()=>this.stateValueDelete(value)} icon="trash-alt" className="mr-2" />
              </Fragment>
      }) : ''

    })

    return result;
  }

  componentWillMount() {
    callApi('users', 'GET', {})
      .then(res => {
        console.log(res.data)
        this.setState({
          data: {
            columns: [...data1.columns],
            rows: [...this.standardData(res.data)]
          }
        })
      })
      .catch(err => {

      })
  }
  
 
 


  getDataFromChild = (message)=>{
    console.log(message.data)
    if(message.addNew){
      this.setState({
        data:{
          columns: [...data1.columns],
          rows:[...this.state.data.rows,...this.standardData([message.data])]
        }
      })
    }else{
      let newRow = this.standardData([message.data])[0]
      let index = this.state.data.rows.findIndex((el)=>{
        return el._id===message.data._id
      })
      
      this.setState({
        data:{
          columns: [...data1.columns],
          rows:[...this.state.data.rows.fill(newRow,index,index+1)]
        }
      })
      console.log(this.state.data.rows)


    }
  }

  onShowImg = () =>{
    return (
      <MDBContainer>
         
      <MDBModal  isOpen={true} toggle={this.toggle} fullHeight position="bottom" size="lg">
        <MDBModalHeader toggle={this.toggle}>
         <h2> Hình ảnh vi phạm</h2>
        </MDBModalHeader>
        <MDBModalBody className="text-center">
          <ProFileFormComponent 
            value={this.state.valueToggle}
            getDataFromChild={this.getDataFromChild}
          />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
    )
  }
  onShowQuestion = () =>{
    return (
      <MDBContainer>
         
       <MDBModal  isOpen={true} toggle={this.toggle1} fullHeight position="bottom" size="lg">
        <MDBModalHeader toggle={this.toggle}>
         <h2> Xác nhận</h2>
        </MDBModalHeader>
        <MDBModalBody className="text-center">
          <h3>Bạn có chắc muốn xóa tài khoản này không ?</h3>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="danger" onClick={()=>this.onDelete(this.state.valueDelete)}>Xác nhận</MDBBtn>
          <MDBBtn color="secondary" onClick={this.toggle1}>Close</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
    )
  }

  render() {

    return (

      <div className="container-fluid">

        {/* Page Heading */}
        <h1 className="h3 mb-2 text-gray-800">Tài khoản</h1>
        {/* <p className="mb-4">DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the <a target="_blank">official DataTables documentation</a>.</p> */}
        {/* DataTales Example */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Danh sách tài khoản</h6>
            <MDBBtn className="float-right" onClick={() => this.onClick()} rounded color="primary" > <MDBIcon icon="plus" className="mr-2" /> Thêm mới</MDBBtn>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <MDBDataTable
                className="text-center"
                striped
                // hover
                bordered
               
                data={this.state.data}
              />
              {this.state.modal ? this.onShowImg() : ''}
              {this.state.modal1 ? this.onShowQuestion() : ''}
            </div>
          </div>
        </div>
       
      </div>
    )
  }
}

export default BodyMangerAccountAdminComponent;



