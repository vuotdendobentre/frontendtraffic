import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import callApi from './../apicall/apiCaller'
import * as Config from './../apicall/Config';

class PopupImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: true,
            data : []
        };
    }
    componentDidMount(){
        let {_id, Blate ,date,time } = this.props.data;
        date =  date.replace(/\//g,'_');
        
        callApi(`fails/${Blate}/${date}`,'GET',null).then(res=>{
            if(res.data){
                let index = res.data.findIndex((value)=>{
                    return value._id == _id;
                    
                })
                console.log(index)
                this.setState({
                    data : res.data
                })
            }
        })
    }
    onRenderHight = (images,photoIndex,isOpen) =>{
        return (
            <div>
                {isOpen && (
                    <Lightbox
                        mainSrc={images[photoIndex]}
                        nextSrc={images.length>0 ?(images[(photoIndex + 1) % images.length]): ''}
                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                        onCloseRequest={() => this.setState({ isOpen: false }),this.props.onSelectComponent}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + images.length - 1) % images.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % images.length,
                            })
                        }
                    />
                )}
            </div>
        )
    }
    onRenderLow = (images,photoIndex,isOpen) =>{
       
        return (
            <div>
              
                {isOpen && (
                    
                    <Lightbox

                        
                        mainSrc={images[photoIndex]}
                        
                        onCloseRequest={() => this.setState({ isOpen: false }),this.props.onSelectComponent}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + images.length - 1) % images.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % images.length,
                            })
                        }
                        
                    />
                )}
            </div>
        )
    }

    render() {
        const { photoIndex, isOpen } = this.state;
        let { data } = this.state;
        data = data.map((value,index)=>{
            return `${Config.API_URL}/img/${value.date.replace(/\//g,'_')}/${value.Blate}_${value.time}.jpg`
        })
        console.log(data[0])
        return (
            
                data.length-1>0 ? this.onRenderHight(data,photoIndex,isOpen) : this.onRenderLow(data,photoIndex,isOpen)
            
            
        );
    }
}

export default PopupImage