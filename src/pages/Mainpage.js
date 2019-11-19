import React, { Component } from 'react'
import Header from './../components/Header'
import MainBody from './../components/MainBody'

export default class MainPage extends Component {
    render() {
        return (
            <div id="container">
            <Header/>
            <MainBody/>
            
            {/*  */}
            {/* MODAL SECTION */}
            {/*  */}
            <div className="modal fade" id="commentModal" tabIndex={-1} role="dialog" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                <div className="modal-content">
                  <div className="modal-header bg-dark">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <i className="fa fa-times text-white" />
                    </button>
                  </div>
                  <div className="modal-body">
                    <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
                      <button id="submitCommentButton" className="btn btn-outline-success">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}
