import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <header className="container-fluid" id="ticketHeader">
              <div style={{width: '100%', backgroundColor: 'azure', opacity: '0.9'}} className="fixed-top">
                <div  style={{display: 'flex', width: '90%', justifyContent: 'space-between'}} className="mx-auto" id="top">
                  <div  style={{display: 'flex', justifyContent: 'space-between'}}>
                    <a href="main" className="d-inline-block">
                      <button className="btn btn-info btn-lg topEl" id>
                        <i className="fa fa-home" />
                      </button>
                    </a>
                  </div>
                  <div style={{display: 'flex'}} id="topRight">
                    <div style={{display: 'inline'}} className="d-none d-md-block topEl">
                      <input list="camera" placeholder="Chose a camera" id="assignName" />
                      <datalist id="camera">
                        <option id="op" v-for="camera in cameraArray">{'{'}{'{'}camera.name{'}'}{'}'}</option>
                      </datalist>
                    </div>
                    <button type="button" className="btn btn-info topEl">DO_ST</button>
                    <button type="button" className="btn btn-info topEl">DO_ST</button>
                    <button type="button" className="btn btn-info topEl">DO_ST</button>
                    <button type="button" className="btn btn-info topEl">
                      <i className="fa fa-sign-out" />
                    </button>
                    <button  className="btn btn-outline-dark d-md-none topEl" type="button" data-toggle="collapse" data-target="#selector" aria-expanded="false" aria-controls="collapseExample">
                      <i className="fa fa-list" />
                    </button>
                  </div>
                </div>
              </div>
            </header>    
        )
    }
}
