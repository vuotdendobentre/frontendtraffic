import React, { Component } from 'react'
import callApi from './../apicall/apiCaller'
import { connect } from 'react-redux'
import PopupImage from './PopupImage';
import _date from './../datetime/date'
class DataBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataContainer: [],
            index: '',
            dataImg: {},
            isShowImage: false,
            onSearch: null,
            sl: 0,
            slUser : 0,
            maxSl: null,
            plateSearch: '--',
            dateSearch: '--',
            timeSearch: '--'
        }
    }

    Chonfile(arr, soluong) {
        soluong = parseInt(soluong);
        soluong = soluong * 10;
        if (arr.length > (soluong + 10)) {
            return (arr.slice(soluong, soluong + 10));
        } else {
            return arr.slice(soluong, arr.length);
        }
    
    }

    onChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value === '' ? '--' : value,
            sl : 0
        })
    }
    //get api
    componentDidMount() {

        if (this.props.role === 0) {

            callApi(`fails/newbydate/--/${_date.getDay().replace(/\//g, '_')}/--/${this.state.sl}`, 'GET', null).then(res => {
                if (res && res.data) {
                    this.setState({
                        onSearch: false,
                        data: res.data.data,
                        maxSl: parseInt(res.data.maxSl)
                    })

                    //this.onRenderData()
                }
            })
        } else {
            callApi(`fails/plate`, 'POST', {
                plate: this.props.plate
            }).then(res => {
                if (res && res.data) {
                    console.log(res.data)
                    this.setState({
                        data: JSON.parse(JSON.stringify(res.data)),
                        plateSearch : this.props.plate[0]
                    })
                }
            })
        }
    }

    onDataValid = (data) => {
        if (data && data !== undefined && data !== "undefined") {
            return data
        }
        return ''
    }
    onShowImage = (event) => {
        console.log(event.target.name)
        this.setState({
            index: parseInt(event.target.name),
            dataImg: this.state.data[parseInt(event.target.name)],
            isShowImage: true
        })
    }
    onRenderData() {
        let result = ''
         
        if (this.state.data && this.state.data.length > 0) {
            let data = this.props.role === 0 ? this.state.data : this.Chonfile(this.state.data,this.state.slUser)
            result = data.map((value, index) => {
                return (
                    <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{value.Blate}</td>
                        <td>{value.date.split('/').reverse().join('/')}</td>
                        <td>{value.time}</td>
                        <td style={{textAlign:"left"}}>
                           
                                {
                                    value.type===1 ? <ul><li>Vượt đèn đỏ</li></ul> : 
                                    
                                    value.type===2 ? <ul><li>Không đội mũ bảo hiểm</li></ul> :  
                                    <ul>
                                        <li>Vượt đèn đỏ</li>
                                        <li>Không đội mũ bảo hiểm</li>
                                    </ul> 
                                }
                            
                        </td>
                        <td>{this.onDataValid(value.user ? value.user.name : '')}</td>
                        <td>{this.onDataValid(value.user ? value.user.CMND : '')}</td>
                        <td>{this.onDataValid(value.user ? value.user.SDT : '')}</td>
                        <td>
                            <button name={index} key={index + 1} onClick={(event) => this.onShowImage(event)} className="btn btn-danger">Xem Hình Ảnh</button>
                        </td>
                    </tr>
                )
            })
        }
        return result;
    }
    callBackFromChildBody = () => {
        this.setState({
            isShowImage: false
        })
    }

    onChangeSearch = () => {
        if (this.state.onSearch === true) {
            this.setState({
                onSearch: false,
                // data: res.data
            })
           
            callApi(`fails/newbydate/--/${_date.getDay().replace(/\//g, '_')}/--/${this.state.sl}`, 'GET', null).then(res => {
                if (res && res.data) {
                    this.setState({
                        onSearch: false,
                        data: res.data.data,
                        maxSl: parseInt(res.data.maxSl),
                        sl : 0
                    })
                    this.onRenderData()
                }
            })
        } else if (this.state.onSearch === false) {

            this.setState({
                onSearch: true,
                dataContainer: this.state.data,
                data: [],
                sl : 0
                
            })


        }
    }
    onPrevNext = (char) => {
        console.log(this.state.onSearch)
        if (char == '-') {
            this.setState({
                sl: this.state.sl > 0 ? this.state.sl-1 : 0,
                slUser: this.state.slUser > 0 ? this.state.slUser-1 : 0
            })
        } else {
            
            this.setState({
                sl: ((this.state.sl + 1)*10) <= this.state.maxSl ? (this.state.sl+1) : this.state.sl,
                slUser: ((this.state.slUser + 1)*10) <= this.state.data.length ? (this.state.sl+1) : this.state.slUser
            })
        }
        setTimeout(()=>{
            if (this.props.role === 0) {
                if(this.state.onSearch===false || this.state.onSearch===null){
                    callApi(`fails/newbydate/--/${_date.getDay().replace(/\//g, '_')}/--/${this.state.sl}`, 'GET', null).then(res => {
                        if (res && res.data) {
                            this.setState({
                                onSearch: false,
                                data: res.data.data,
                                maxSl: parseInt(res.data.maxSl),
                                sl : 0
                            })
                            this.onRenderData()
                        }
                    })
                }else{
                    let date = this.state.dateSearch !== '--' ? this.state.dateSearch.replace(/\//g, '_') : '--'
                    if (date !== '--') {
                        date = date.split('_').reverse().join('_')
                    }
                    //console.log(`fails/newbydate/${this.state.plateSearch}/${date}/${this.state.timeSearch}/${this.state.sl}`)
                    callApi(`fails/newbydate/${this.state.plateSearch}/${date}/${this.state.timeSearch}/${this.state.sl}`, 'GET', null).then(res => {
                        if (res && res.data) {
                            console.log(res.data.data)
                            this.setState({
                                //onSearch: false,
                                data: res.data.data,
                                maxSl: parseInt(res.data.maxSl),
        
                            })
                            this.onRenderData()
                        }
                    })
                }
            }
        },200)

    }

    onFind = () => {
        let date = this.state.dateSearch !== '--' ? this.state.dateSearch.replace(/\//g, '_') : '--'
        if (date !== '--') {
            date = date.split('_').reverse().join('_')
        }
        console.log(date)
        if (this.props.role === 0) {
            callApi(`fails/newbydate/${this.state.plateSearch}/${date}/${this.state.timeSearch}/${this.state.sl}`, 'GET', null).then(res => {
                if (res && res.data) {
                    this.setState({
                        //onSearch: false,
                        data: res.data.data,
                        maxSl: res.data.maxSl,

                    })
                }
            })
        } else {

            callApi(`fails/newbydate/${this.state.plateSearch}/${date}/${this.state.timeSearch}/${this.state.sl}`, 'GET', null).then(res => {
                console.log(res.data.data)
                if (res && res.data) {
                    this.setState({
                        //onSearch: false,
                        data: res.data.data,
                        maxSl: res.data.maxSl,

                    })
                }
            })

        }
    }

    render() {
        
        return this.state.isShowImage ? <PopupImage onSelectComponent={this.callBackFromChildBody} data={this.state.dataImg} /> : (
            <div>
                {
                    !this.state.onSearch && this.props.role === 0 ? (
                        <div className="row">
                            <div className="col" style={{ paddingBottom: '10px' }}>
                                <button onClick={() => this.onChangeSearch()} type="button" className="btn btn-success">{this.state.onSearch ? 'Mới Nhất' : 'Tìm Kiếm'}</button>
                            </div>
                        </div>
                    ) : (
                            <div className="row">
                                {
                                    this.props.role === 0 ? (
                                        <div className="col" style={{ paddingBottom: '10px' }}>
                                            <button onClick={() => this.onChangeSearch()} type="button" className="btn btn-success">{this.state.onSearch ? 'Mới Nhất' : 'Tìm Kiếm'}</button>
                                        </div>
                                    ) : ''
                                }
                                {
                                    this.props.role === 0 ? (
                                        <div className=" col-xs-12 col-sm-12 col-md-12 col-lg-2 input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">Biển Số</span>
                                            </div>
                                            <input onChange={(event) => this.onChange(event)} name='plateSearch' type="text" className="form-control" placeholder="vd: : 71A100000" />
                                        </div>
                                    ) : (
                                            <div className=" col-xs-12 col-sm-12 col-md-12 col-lg-2 input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">Biển Số</span>
                                                </div>
                                                <select onChange={(event) => this.onChange(event)} name='plateSearch' type="text" className="form-control" placeholder="vd: : 71A100000">
                                                    {this.props.plate.map((value, index) => {
                                                        return (<option>{value}</option>)
                                                    })}
                                                </select>

                                            </div>
                                        )
                                }
                                <div className=" col-xs-12 col-sm-12 col-md-12 col-lg-2 input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Ngày</span>
                                    </div>
                                    <input onChange={(event) => this.onChange(event)} name='dateSearch' type="text" className="form-control" placeholder="vd: : 01/01/2019" />
                                </div>
                                <div className=" col-xs-12 col-sm-12 col-md-12 col-lg-2 input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Thời Gian</span>
                                    </div>
                                    <input onChange={(event) => this.onChange(event)} name='timeSearch' type="text" className="form-control" placeholder="vd: : 00:00:00" />
                                </div>

                                <div className=" col-xs-12 col-sm-12 col-md-12 col-lg-2 input-group mb-3">
                                    <button onClick={() => this.onFind()} type="button" className="btn btn-danger">Xác Nhận</button>
                                </div>
                            </div>
                        )
                }




                <table className="table table-hover" style={{ textAlign: 'center' }} id="myTable">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Biển Số</th>
                            <th scope="col">Ngày Vi Phạm</th>
                            <th scope="col">Lỗi Vi Phạm</th>
                            <th scope="col">Thời Gian</th>
                            <th scope="col">Tên Chủ Phương Tiện</th>
                            <th scope="col">CMND</th>
                            <th scope="col">SDT</th>
                            <th scope="col">Hình Ảnh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.onRenderData()}
                    </tbody>
                </table>
                <div style={{ textAlign: 'center' }}>
                    <a onClick={() => this.onPrevNext('-')} className="float-center previous round">&#8249;</a>
                    <a onClick={() => this.onPrevNext('+')} className="float-center next round">&#8250;</a>
                </div>
            </div >

        )
    }
}


const mapStateToProps = state => {
    return {
        username: state.username,
        role: state.role,
        plate: state.plate
    }
}

export default connect(mapStateToProps)(DataBody)