import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const images = [
    '//placekitten.com/1500/500',
    // '//placekitten.com/4000/3000',
    // '//placekitten.com/800/1200',
    // '//placekitten.com/1500/1500',
];

class PopupImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: true,
        };
    }

    onRenderHight = (photoIndex,isOpen) =>{
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
    onRenderLow = (photoIndex,isOpen) =>{
        console.log('low')
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
        console.log(images.length)
        return (
            
                images.length-1>0 ? this.onRenderHight(photoIndex,isOpen) : this.onRenderLow(photoIndex,isOpen)
            
            
        );
    }
}

export default PopupImage