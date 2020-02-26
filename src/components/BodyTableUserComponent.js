import React, { Component } from 'react'
import { MDBDataTable, MDBBtn, MDBIcon, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer } from 'mdbreact'
import callApi from '../apicall/apiCaller'
import * as urlConfig from '../apicall/Config'
import unixTime from 'unix-timestamp'
import { connect } from 'react-redux'

const data1 = {
    columns: [
        {
            label: 'Biển số',
            field: 'Plate',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Ngày',
            field: 'date',
            sort: 'asc',
            width: 270
        },
        {
            label: 'Thời gian',
            field: 'time',
            sort: 'asc',
            width: 200
        },
        {
            label: 'Lỗi vi phạm',
            field: 'type',
            sort: 'asc',
            width: 100
        },
        {
            label: 'Người vi phạm',
            field: 'name',
            sort: 'asc',
            width: 150
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
            label: 'Xem Hình Ảnh',
            field: 'btn',
            width: 100
        }
    ],
    rows: [

    ]
}

class BodyTableUserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: data1,
            modal: false,
            dataImg: '',
            valueImg :{}
        }
    }

    convertUrlImg = (value) => {
        let url = ''
        try {
          url = `${urlConfig.API_URL}/img/${value.Plate}_${unixTime.fromDate(value.date + ' ' + value.time)}.jpg`
        } catch{ }
        return url
    }

    onClick = (value) => {
        this.toggle()
        this.setState({
          valueImg:value,
          dataImg: this.convertUrlImg(value)
        });
      }
      toggle = () => {
        this.setState({
          modal: !this.state.modal
        })
    }

    standardData = (dataContainer) => {
        let result = []
        result = dataContainer.map((value, index) => {
            let objUser = { ...value.user[0] };
            delete value._id
            delete value.user
            delete objUser._id
            delete objUser.Plate
            delete objUser.username
            delete objUser.password
            delete objUser.rule

            return Object.assign({}, { ...value, type: this.valueType(value.type) }, objUser, {
                btn: <MDBBtn onClick={(event) => this.onClick(value)} rounded color="secondary" > <MDBIcon icon="eye" className="mr-2" /> Xem</MDBBtn>
            })

        })

        return result;
    }

    valueType = (num) => {
        switch (num) {
            case 0:
                return 'Vượt đèn đỏ và Không đội mũ bảo hiểm'
            case 1:
                return 'Vượt đèn đỏ'
            case 2:
                return 'Không đội mũ bảo hiểm'
            default:
                return ''
        }
    }

    componentWillMount() {
        this.props.Plate.map((value, index) => {
            callApi(`fails/${value}`, 'GET', {})
                .then(res => {
                    this.setState({
                        data: {
                            columns: [...this.state.data.columns],
                            rows: this.state.data.rows.concat(this.standardData(res.data.data))
                        }
                    })
                })
                .catch(err => {

                })
            return true
        })
    }

    onShowImg = () =>{
        return (
          <MDBContainer>
          <MDBModal  isOpen={true} toggle={this.toggle} fullHeight position="bottom" size="lg">
            <MDBModalHeader toggle={this.toggle}>
             <h2> Hình ảnh vi phạm</h2>
             <ul>
              <li>{`Biển số : ${this.state.valueImg.Plate}`}</li>
              <li>{`Ngày: ${this.state.valueImg.date}`}</li>
              <li>{`Thời gian: ${this.state.valueImg.time}`}</li>
              <li>{`Lỗi vi phạm : ${this.valueType(this.state.valueImg.type)}`}</li>
            </ul>
            </MDBModalHeader>
            <MDBModalBody className="text-center">
            <img src={this.state.dataImg} className="img-fluid" alt="" />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>
        )
      }

    render() {

      
        return (

            <div className="container-fluid bg-gray-500">

                {/* Page Heading */}
                <h1 className="h3 mb-2 text-gray-800">Lỗi vi phạm</h1>
                {/* <p className="mb-4">DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the <a target="_blank">official DataTables documentation</a>.</p> */}
                {/* DataTales Example */}
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Bảng thông tin vi phạm</h6>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <MDBDataTable
                                striped
                                // hover
                                bordered

                                data={this.state.data}
                            />
                         {this.state.modal ? this.onShowImg() : ''}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        Plate: state.plate
    }
}

export default connect(mapStateToProps)(BodyTableUserComponent)