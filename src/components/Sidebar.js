import React, { Component } from 'react'

export default class SideBar extends Component {
    constructor(props) {
        super(props);
        
    }
    
    onClick = number =>{
        //console.log(number)
        this.props.onSideSelect(number)
    }
    render() {
        return (
            <div id="selector" className="col-lg-2 collapse d-md-block" style={{width: '100%'}}>
                <div id="adminButton" className="d-flex flex-column">
                  <button onClick={()=>this.onClick(0)} className="btn btn-secondary" style={{margin: '1em 0'}}>LIVE</button>
                  <button onClick={()=>this.onClick(1)} className="btn btn-secondary" style={{margin: '1em 0'}}>DATA</button>
                  <button onClick={()=>this.onClick(2)} className="btn btn-secondary" style={{margin: '1em 0'}}>CONFIG USERS</button>
                </div>
            </div>
        )
    }
}
