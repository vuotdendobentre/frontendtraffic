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
            maxSl: null,
            plateSearch :'--',
            dateSearch :'--',
            timeSearch:'--'
        }
    }


    onChange = (event)=>{
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value==='' ? '--' :  value 
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
                        maxSl: res.data.maxSl
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
                        data: JSON.parse(JSON.stringify(res.data))
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

            result = this.state.data.map((value, index) => {
                return (
                    <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{value.Blate}</td>
                        <td>{value.date}</td>
                        <td>{value.time}</td>
                        <td>{this.onDataValid(value.user ? value.user.name : '')}</td>
                        <td>{this.onDataValid(value.user ? value.user.CMND : '')}</td>
                        <td>{this.onDataValid(value.user ? value.user.SDT : '')}</td>
                        <td>
                            <button name={index} key={index + 1} onClick={(event) => this.onShowImage(event)} className="btn btn-danger">xem hình ảnh</button>
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
            console.log(`fails/newbydate/--/${_date.getDay().replace(/\//g, '_')}/--/${this.state.sl}`)
            callApi(`fails/newbydate/--/${_date.getDay().replace(/\//g, '_')}/--/${this.state.sl}`, 'GET', null).then(res => {
                if (res && res.data) {
                    this.setState({
                        onSearch: false,
                        data: res.data.data,
                        maxSl: res.data.maxSl
                    })
                    this.onRenderData()
                }
            })
        } else if (this.state.onSearch === false) {

            this.setState({
                onSearch: true,
                dataContainer: this.state.data,
                data: []
            })


        }
    }
    onPrevNext = (char) => {
        if (char == '-') {
            this.setState({
                sl: this.state.sl > 0 ? this.state.sl-- : 0
            })
        } else {
            this.setState({
                sl: this.state.sl + 1 <= this.state.maxSl ? this.state.sl++ : this.state.sl
            })
        }

        if (this.state.role === 0) {
            callApi(`fails/newbydate/--/${_date.getDay().replace(/\//g, '_')}/--/${this.state.sl}`, 'GET', null).then(res => {
                if (res && res.data) {

                    this.setState({
                        onSearch: false,
                        data: res.data.data,
                        maxSl: res.data.maxSl
                    })
                    this.onRenderData()
                }
            })
        }

    }

    onFind = ()=>{
        let date = this.state.dateSearch !=='--' ? this.state.dateSearch.replace(/\//g,'_') : '--'
        date = date.split('_').reverse().join('_')
        console.log(date)
        if(this.props.role===0){
            callApi(`fails/newbydate/${this.state.plateSearch}/${date}/${this.state.timeSearch}/${this.state.sl}`,'GET',null).then(res=>{
                if(res && res.data){
                    this.setState({
                        //onSearch: false,
                        data: res.data.data,
                        maxSl: res.data.maxSl,
                        
                    })
                }
            })
        }else{
           
                callApi(`fails/newbydate/${this.props.plate[0]}/${date}/${this.state.timeSearch}/${this.state.sl}`,'GET',null).then(res=>{
                    if(res && res.data){
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
        console.log(this.state)
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
                                                <span className="input-group-text">Plate</span>
                                            </div>
                                            <input onChange={(event)=>this.onChange(event)} name='plateSearch' type="text" className="form-control" placeholder="ex : 71A100000" />
                                        </div>
                                    ) : ''
                                }
                                <div className=" col-xs-12 col-sm-12 col-md-12 col-lg-2 input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Date</span>
                                    </div>
                                    <input onChange={(event)=>this.onChange(event)} name='dateSearch' type="text" className="form-control" placeholder="ex : 01/01/2019" />
                                </div>
                                <div className=" col-xs-12 col-sm-12 col-md-12 col-lg-2 input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Time</span>
                                    </div>
                                    <input onChange={(event)=>this.onChange(event)} name='timeSearch' type="text" className="form-control" placeholder="ex : 00:00:00" />
                                </div>

                                <div className=" col-xs-12 col-sm-12 col-md-12 col-lg-2 input-group mb-3">
                                    <button onClick={()=>this.onFind()} type="button" className="btn btn-danger">Submit</button>
                                </div>
                            </div>
                        )
                }



                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Biển Số</th>
                            <th scope="col">Ngày Vi Phạm</th>
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