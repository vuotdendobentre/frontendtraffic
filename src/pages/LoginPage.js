import React, { Component } from 'react'

export default class loginPage extends Component {
    render() {
        return (
            <div id="loginSection">
                <div style={{ display: 'flex', height: '100%', backgroundColor: 'azure', alignItems: 'center' }} className="align-bottom">
                    <form action="/main" className="mx-auto shadow p-3 mb-5 bg-white rounded" style={{ width: '40%', padding: '2em' }}>
                        <div className="form-group">
                            <label htmlFor="userName">User name</label>
                            <input type="email" className="form-control" id="userName" aria-describedby="emailHelp" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                            <input type="hidden" name="username" defaultValue />
                            <button type="submit" className="btn btn-primary">
                                Login
              </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
