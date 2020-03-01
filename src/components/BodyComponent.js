import React, { Component } from 'react'
import callApi from '../apicall/apiCaller'
import PieChartBodyComponent from './PieChartBodyComponent'

class BodyComponent extends Component {

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
    callApi(`fails/count`, 'GET', {}).then(res => {
      try {
        if (res.data) {
          let { type0, type1, type2 } = res.data
          console.log(res.data)
          this.setState({
            type0, type1, type2, statusData: true
          })
        }
      } catch{ }
    })

  }

  render() {
    let { type0, type1, type2 } = this.state
    return (
      <div className="container-fluid bg-gray-500">
        {/* Page Heading */}
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Thông tin và thống kê</h1>
          {/* <a href="# "href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50" /> Generate Report</a> */}
        </div>
        {/* Content Row */}
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
        {/* Content Row */}
        <div className="row">
          {/* Content Column */}
          <div className="col-lg-6 mb-4">
            {/* Project Card Example */}
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
                {this.state.statusData ? <PieChartBodyComponent data={{ type0, type1, type2 }} /> : ''}
                <p>
                  Biểu đồ cho thấy thông kê các lỗi vượt đèn đỏ và không đội mũ bảo hiểm mà hệ thống đã ghi nhận được trong thời gian qua bao gồm <b>vượt đèn đỏ</b> là {Math.ceil((type1*100)/(type0+type1+type2))}%, <b>không đội mũ bảo hiểm </b>là {Math.ceil((type2*100)/(type0+type1+type2))}% và <b>vi phạm cùng lúc cả 2 lỗi</b> là {100 - Math.ceil((type1*100)/(type0+type1+type2)) -Math.ceil((type2*100)/(type0+type1+type2))}%
                  </p>
              </div>
            </div>
            {/* Approach */}
            
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <a href="http://baodongkhoi.vn/an-ninh/an-toan-giao-thong" target="_blank" className="m-0 font-weight-bold text-primary">An toàn giao thông báo <b>Đồng Khởi</b></a>
              </div>
              <div className="card-body">
              <div className="text-center">
                  <a href="http://baodongkhoi.vn/an-ninh/an-toan-giao-thong" target="_blank" className="m-0 font-weight-bold text-primary">
                  <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: '50rem' }} src="http://image.baodongkhoi.vn/fckeditor/upload/2020/20200225/images/CCB.jpg" alt="" />
                  </a>
                </div>
                <p>Thời gian qua, tai nạn giao thông (TNGT) vẫn luôn là vấn đề nhức nhối của toàn xã hội. Công tác đảm bảo trật tự an toàn giao thông (ATGT) luôn được các ngành, đoàn thể, chính quyền các địa phương quan tâm thực hiện liên tục.</p>
                
                <a href="http://baodongkhoi.vn/an-ninh/an-toan-giao-thong"  target="_blank"  rel="oopener noreferrer" ><u>Nhấp để đi đến trang →</u></a>
              </div>
              
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            {/* Illustrations */}
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <a href="https://luatvietnam.vn/tin-van-ban-moi/vuot-den-do-bi-phat-bao-nhieu-2020-186-23421-article.html" target="_blank"  rel="oopener noreferrer" className="m-0 font-weight-bold text-primary">Vượt đèn đỏ phạt bao nhiêu tiền ?</a>
              </div>
              <div className="card-body">
                <div className="text-center">
                  <a href="https://luatvietnam.vn/tin-van-ban-moi/vuot-den-do-bi-phat-bao-nhieu-2020-186-23421-article.html" target="_blank"  rel="oopener noreferrer" className="m-0 font-weight-bold text-primary">
                  <img  target="_blank"  rel="oopener noreferrer" className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: '50rem' }} src="https://vnpanda.com/wp-content/uploads/2019/04/vuot-den-do-phat-bao-nhieu-tien.jpg" alt="" />
                  </a>
                </div>
                <p><b>Vượt đèn đỏ là một trong những lỗi thường gặp khi tham gia giao thông. Ngày 30/12/2019, Chính phủ đã ban hành Nghị định số 100, trong đó tăng mạnh mức phạt với hành vi này</b></p>
                <a href="https://luatvietnam.vn/tin-van-ban-moi/vuot-den-do-bi-phat-bao-nhieu-2020-186-23421-article.html"  target="_blank"  rel="oopener noreferrer" ><u>Nhấp để đi đến trang →</u></a>
              </div>
            </div>
            {/* Approach */}
            <div className="card shadow mb-4">
              <div className="card-header py-3">
              <a href="https://www.baogiaothong.vn/ben-tre-tag" target="_blank"  rel="oopener noreferrer" className="m-0 font-weight-bold text-primary">Tin tức giao thông Bến Tre</a>
              </div>
              <div className="card-body">
                <a href="https://www.baogiaothong.vn/ben-tre-tag" target="_blank"  rel="oopener noreferrer" className="m-0 font-weight-bold text-primary">
                  <img  target="_blank"  rel="oopener noreferrer" className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: '50rem' }} src="https://cdn.24h.com.vn/upload/2-2019/images/2019-04-23/Phan-cam-khi-doan-xe-tuyen-truyen-an-toan-giao-thong-lai-vuot-den-do-vuot-1556009264-415-width540height304.jpg" alt="" />
                </a>
                <p>Tại tỉnh Bến Tre, từ đầu năm 2019 đến nay, tình hình trật tự ATGT có sự chuyển biến tích cực, TNGT được kéo giảm trên cả 3 tiêu chí. So với cùng kỳ năm 2018, số vụ TNGT giảm 18,3%, số người chết giảm 29,8% và số người bị thương giảm 13,7%.</p>
                <a href="https://www.baogiaothong.vn/ben-tre-tag"  target="_blank"  rel="oopener noreferrer" ><u>Nhấp để đi đến trang →</u></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      

    )
  }
}

export default BodyComponent;