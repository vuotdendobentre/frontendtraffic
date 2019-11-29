import React, { Component } from 'react'
import callApi from './../apicall/apiCaller'
import { EEXIST } from 'constants';

export default class ConfigUserBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            maxSl: 0,
            userSelect: {},
            indexSelect: 0,
            sl: 0,
            usernameSearch : ''
        }
    }

    componentDidMount() {
        callApi(`users`, 'GET', {
            sl: 0
        }).then(res => {
            if (res) {
                this.setState({
                    data: res.data.data,
                    maxSl: res.data.maxSl
                })
            }
        })
    }
    reLoadData() {
        callApi(`users`, 'GET', {
            sl: this.state.sl
        }).then(res => {
            if (res) {
                this.setState({
                    data: res.data.data,
                    maxSl: res.data.maxSl
                })
            }
        })
    }


    onSelectUser = (event) => {
        let { name, id } = event.target;

        if (name === undefined) {
            this.setState({
                userSelect: this.state.data[parseInt(id)]
            })
        } else {
            this.setState({
                userSelect: this.state.data[parseInt(name)]
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
                sl: (this.state.sl + 1) * 15 <= this.state.maxSl ? this.state.sl++ : this.state.sl
            })
        }
        console.log(this.state.sl)

        callApi(`users`, 'GET', {
            sl: this.state.sl
        }).then(res => {
            if (res) {
                this.setState({
                    data: res.data.data,
                    maxSl: res.data.maxSl
                })
            }
        })


    }

    textOnChange = (event) => {
        let { value, name } = event.target
        this.setState({
            userSelect: { ...this.state.userSelect, [name]: value }
        })
    }


    onUpdate = () => {
        let { userSelect } = this.state;
        callApi(`users/${userSelect.username}`, 'PUT', userSelect).then(res => {
            console.log(res.data);
        })
        let index = this.state.data.findIndex(Element => Element._id === userSelect._id)
        this.state.data.splice(index, 1, userSelect);
        // this.state.data.push(userSelect)
        this.setState({
            data: [...this.state.data]
        })
    }
    onChange =(event)=>{
        let { value,name } = event.target; 
        this.setState({
            [name] : value
        })
    }

    onFind = () =>{
        if(this.state.usernameSearch===''){
            callApi(`users`, 'GET', {
                sl: 0
            }).then(res => {
                if (res) {
                    this.setState({
                        data: res.data.data,
                        maxSl: res.data.maxSl
                    })
                }
            })
        }else{
            callApi(`users/${this.state.usernameSearch}`,'GET',null).then(res=>{
                if(res && res.data){
                    this.setState({
                        data : res.data
                    })
                }
            })
        }
    }

    render() {
        let { userSelect } = this.state
        console.log(this.state.usernameSearch)
        return (
            <div>
                <div className="row">
                    <div className=" col-xs-12 col-sm-12 col-md-12 col-lg-2 input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Tên Tài Khoản</span>
                        </div>
                        <input onChange={(event) => this.onChange(event)} name='usernameSearch' type="text" className="form-control" placeholder="vd: : user1" />
                    </div>               
                    <div className=" col-xs-12 col-sm-12 col-md-12 col-lg-2 input-group mb-3">
                        <button onClick={() => this.onFind()} type="button" className="btn btn-danger">Tìm Kiếm</button>
                    </div>
                </div>
                <div id="info" className="col-sm-12 col-md-12 col-lg-11">
                    <table className="table table-hover" style={{ textAlign: 'center' }} id="myTable">
                        <thead className="thead-dark">
                            <tr>
                                <th>#</th>
                                <th scope="col">Tên </th>
                                <th scope="col">Tên Tài Khoản</th>
                                <th scope="col">Mật Khẩu</th>
                                <th scope="col">CMND</th>
                                <th scope="col">SDT</th>
                                <th scope="col">Quyền Truy Cập</th>
                                <th scope="col">Biển Số</th>
                                <th scope="col">Chỉnh Sửa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.data ? this.state.data.map((user, index) => {
                                    return (
                                        <tr key={index + 1}>
                                            <th>{index + 1}</th>
                                            <td>{user.name}</td>
                                            <td>{user.username}</td>
                                            <td>{user.password}</td>
                                            <td>{user.CMND}</td>
                                            <td>{user.SDT}</td>
                                            <td>{user.rule}</td>
                                            <td>
                                                <ul>
                                                    {
                                                        user.Blate ? user.Blate.map((plate, index) => {
                                                            return (<li v-for="plate in user.Blate">{plate}</li>)
                                                        }) : ''
                                                    }
                                                </ul>
                                            </td>
                                            <td>

                                                <button name={index} onClick={(event) => this.onSelectUser(event)} className="btn btn-outline-dark" data-toggle="modal" data-target="#configUser" >
                                                    <i id={index} onClick={(event) => this.onSelectUser(event)} className="fa fa-pencil" />
                                                </button>

                                            </td>
                                        </tr>
                                    )
                                }) : ''
                            }
                            <div className="modal fade" id="configUser" tabIndex={-1} aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header bg-dark">
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <i className="fa fa-times text-white" />
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <form id="myForm" >
                                                <div className="form-group d-flex">
                                                    <label htmlFor="userName" className="col-2">
                                                        <strong>Tên Tài Khoản</strong>
                                                    </label>
                                                    <input value={userSelect.username} name="userName" type="text" className="form-control col-10" disabled />
                                                </div>
                                                <div className="form-group d-flex">
                                                    <label htmlFor="name" className="col-2">
                                                        <strong>Tên</strong>
                                                    </label>
                                                    <input onChange={(event) => this.textOnChange(event)} value={userSelect.name} name="name" type="text" className="form-control col-10" />
                                                </div>

                                                <div className="form-group d-flex">
                                                    <label htmlFor="password" className="col-2">
                                                        <strong>Mật Khẩu</strong>
                                                    </label>
                                                    <input onChange={(event) => this.textOnChange(event)} value={userSelect.password} name="password" type="text" className="form-control col-10" />
                                                </div>
                                                <div className="form-group d-flex">
                                                    <label htmlFor="CMND" className="col-2">
                                                        <strong>CMND</strong>
                                                    </label>
                                                    <input onChange={(event) => this.textOnChange(event)} value={userSelect.CMND} name="CMND" type="text" className="form-control col-10" />
                                                </div>
                                                <div className="form-group d-flex">
                                                    <label htmlFor="SDT" className="col-2">
                                                        <strong>SDT</strong>
                                                    </label>
                                                    <input onChange={(event) => this.textOnChange(event)} value={userSelect.SDT} name="SDT" type="text" className="form-control col-10" />
                                                </div>

                                                <div className="form-group d-flex">
                                                    <label htmlFor="plate" className="col-2">
                                                        <strong>Biển Số</strong>
                                                    </label>
                                                    <input value={userSelect.Blate !== undefined ? userSelect.Blate.map((value, index) => { return value }) : ''} name="plate" type="text" className="form-control col-10" disabled />
                                                </div>
                                                <div className="form-group d-flex">
                                                    <label htmlFor="rule" className="col-2">
                                                        <strong>Quyền Truy Cập</strong>
                                                    </label>
                                                    <input onChange={(event) => this.textOnChange(event)} value={userSelect.rule} name="rule" type="text" className="form-control col-10" />
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'row-reverse' }}  >
                                                    <button onClick={() => this.onUpdate()} type='button' className="btn btn-outline-dark">
                                                        Xác Nhận
                                                </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </tbody>

                    </table>
                    <div style={{ textAlign: 'center' }}>
                        <a onClick={() => this.onPrevNext('-')} className="float-center previous round">&#8249;</a>
                        <a onClick={() => this.onPrevNext('+')} className="float-center next round">&#8250;</a>
                    </div>
                </div>
            </div>
        )
    }
}
