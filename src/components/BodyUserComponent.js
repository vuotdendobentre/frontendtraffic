import React, { Component } from 'react'
import callApi from '../apicall/apiCaller'
import { connect } from 'react-redux'
import PieChartBodyComponent from './PieChartBodyComponent'

class BodyUserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            type0: 0,
            type1: 0,
            type2: 0,
            statusData: false
        }
    }

    componentWillMount() {
        this.props.Plate.map((el,index) => {
            callApi(`fails/count/${el}`, 'GET', {}).then(res => {
                if (res.data) {
                    let { type0, type1, type2 } = res.data
                    type0 += this.state.type0
                    type1 += this.state.type1
                    type2 += this.state.type2
                    console.log(res.data)
                    this.setState({
                        type0,
                        type1,
                        type2, 
                        statusData: index+1 === this.props.Plate.length ? true : false
                    })
                }
            })
        })

    }

    render() {
        let { type0, type1, type2 } = this.state
        return (
            <div className="container-fluid bg-gray-500">

                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Thống Kê Cá Nhân</h1>
                </div>

                <div className="row">
                    {/* Earnings (Monthly) Card Example */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center text-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Vượt đèn đỏ</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{type1}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-traffic-light fa-2x text-gray-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Earnings (Monthly) Card Example */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-success shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center text-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Không đội mũ bảo hiêm</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{type2}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-hard-hat fa-2x text-gray-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Earnings (Monthly) Card Example */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-info shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center text-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Vi phạm cả 2 lỗi</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{type0}</div>
                                        {/* <div className="row no-gutters align-items-center">
                      <div className="col-auto">
                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                      </div>
                      <div className="col">
                        <div className="progress progress-sm mr-2">
                          <div className="progress-bar bg-info" role="progressbar" style={{ width: '50%' }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                      </div>
                    </div> */}
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-clipboard-list fa-2x text-gray-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Pending Requests Card Example */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-warning shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center text-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Tổng thống kê</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{type0 + type1 + type2}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-motorcycle fa-2x text-gray-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">

                    <div className="col-lg-12 mb-8">

                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Biểu đồ tròn</h6>
                            </div>
                            <div className="card-body">
                                {/* <h4 className="small font-weight-bold">Server Migration <span className="float-right">20%</span></h4>
                                <div className="progress mb-4">
                                    <div className="progress-bar bg-danger" role="progressbar" style={{ width: '20%' }} aria-valuenow={20} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                                <h4 className="small font-weight-bold">Sales Tracking <span className="float-right">40%</span></h4>
                                <div className="progress mb-4">
                                    <div className="progress-bar bg-warning" role="progressbar" style={{ width: '40%' }} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                                <h4 className="small font-weight-bold">Customer Database <span className="float-right">60%</span></h4>
                                <div className="progress mb-4">
                                    <div className="progress-bar" role="progressbar" style={{ width: '60%' }} aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                                <h4 className="small font-weight-bold">Payout Details <span className="float-right">80%</span></h4>
                                <div className="progress mb-4">
                                    <div className="progress-bar bg-info" role="progressbar" style={{ width: '80%' }} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                                <h4 className="small font-weight-bold">Account Setup <span className="float-right">Complete!</span></h4>
                                <div className="progress">
                                    <div className="progress-bar bg-success" role="progressbar" style={{ width: '100%' }} aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} />
                                </div> */}
                                {this.state.statusData ?  <PieChartBodyComponent data={{type0,type1,type2}}/> : ''}
                            </div>
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

export default connect(mapStateToProps)(BodyUserComponent);