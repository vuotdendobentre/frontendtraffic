import React, { Component } from 'react'
import callApi from './../apicall/apiCaller'
import { connect } from 'react-redux'
import PopupImage from './PopupImage';
class DataBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            index : '',
            isShowImage : false
        }
    }
    
    //get api
    componentDidMount(){
        
        if(this.props.role===0){
          
            callApi(`fails`,'GET',null).then(res=>{
            
                if(res && res.data){
                    this.setState({
                        data : JSON.parse(JSON.stringify(res.data))
                    })
                }
            
            })
        }else{
           

            
            callApi(`fails/plate`,'POST',{
                plate : this.props.plate
            }).then(res=>{
            
                if(res && res.data){
                    
                    this.setState({
                        data : JSON.parse(JSON.stringify(res.data.data))
                    })
                }
            
            })
        }
    }

    onDataValid = (data)=>{
        if(data && data!==undefined && data!=="undefined"){
            return data
        }
        return ''
    }
    onShowImage = (event) =>{
        
        this.setState({
            index : parseInt(event.target.name),
            isShowImage: true
        })
    }
    onRenderData (){
        let result =''
        if(this.state.data && this.state.data.length > 0){
            
             result = this.state.data.map((value,index)=>{
                return (
                    <tr key={index+1}>
                            <td>{index+1}</td>
                            <td>{value.Blate}</td>
                            <td>{value.date}</td>
                            <td>time</td>
                            <td>{this.onDataValid(value.user? value.user.name : '')}</td>
                            <td>{this.onDataValid(value.user? value.user.CMND : '')}</td>
                            <td>{this.onDataValid(value.user? value.user.SDT : '')}</td>
                            <td>
                                <button name={index} key={index+1} onClick={(event)=>this.onShowImage(event)}  className="btn btn-danger">xem hình ảnh</button>
                            </td>
                    </tr>
                )
            })
        }
        return result;
    }
    callBackFromChildBody = ()=>{
        this.setState({
            isShowImage : false
        })
    }
    render() {
      
        return this.state.isShowImage ? <PopupImage onSelectComponent={this.callBackFromChildBody} data={this.state.data}/> :   (
            <div>
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
                <div style={{textAlign:'center'}}>
                        <a  className="float-center previous round">&#8249;</a>
                        <a  className="float-center next round">&#8250;</a>
                </div>
            </div>
            
        )
    }
}


const mapStateToProps = state =>{
    return {
        username : state.username,
        role : state.role,
        plate : state.plate
    }
}

export default connect(mapStateToProps)(DataBody)