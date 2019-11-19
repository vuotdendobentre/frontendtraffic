import React, { Component } from 'react'
import callApi from './../apicall/apiCaller'

export default class DataBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : []
        }
    }
    
    //get api
    componentDidMount(){
        callApi(`fails`,'GET',null).then(res=>{
            if(res.data){
            
                this.setState({
                    data : JSON.parse(JSON.stringify(res.data))
                })
            }
        })
    }

    onDataValid = (data)=>{
        if(data && data!==undefined && data!=="undefined"){
            return data
        }
        return ''
    }
    onRenderData (){
        let result =''
        if(this.state.data){
            
             result = this.state.data.map((value,index)=>{
                return (
                    <tr key={index+1}>
                            <th scope="row">{index+1}</th>
                            <td>{value.Blate}</td>
                            <td>{value.date}</td>
                            <td>{this.onDataValid(value.user.name)}</td>
                            <td>{this.onDataValid(value.user.CMND)}</td>
                            <td>{this.onDataValid(value.user.SDT)}</td>
                            <td>
                                <button  className="btn btn-danger">xem hình ảnh</button>
                            </td>
                    </tr>
                )
            })
        }
        return result;
    }
    render() {
       
        return (
            <div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Biển Số</th>
                            <th scope="col">Ngày Vi Phạm</th>
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
            </div>
        )
    }
}
