import React, { Component } from 'react'

export default class TestComponent extends Component {
    render() {
        return (
            <div className="mfp-zoom-out-cur">
                <div className="mfp-bg mfp-img-mobile mfp-ready" />
                <div className="mfp-wrap mfp-close-btn-in mfp-img-mobile mfp-ready" tabIndex={-1} style={{ overflow: 'hidden auto' }}>
                    <div className="mfp-container mfp-s-ready mfp-image-holder">
                        <div className="mfp-content">
                            <div className="mfp-figure"><button title="Close (Esc)" type="button" className="mfp-close">×</button>
                                <figure><img className="mfp-img" src="https://ttol.vietnamnetjsc.vn/images/2018/05/25/13/40/net-cuoi-be-gai-9-1527053440039156820618.jpg" style={{ maxHeight: '372px' }} />
                                    <figcaption>
                                        <div className="mfp-bottom-bar">
                                            <div className="mfp-title" />
                                            <div className="mfp-counter" />
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                        <div className="mfp-preloader">Loading...</div>
                    </div>
                </div>
            </div>

        )
    }
}
