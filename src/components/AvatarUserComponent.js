import React, { Component } from 'react'


class AvatarUserComponent extends Component {
    render() {
        return (
            <div>
                <a className="nav-link dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">Valerie Luna</span>
                    <img className="img-profile rounded-circle" src="./user_logo.png" />
                </a>

                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                    <a className="dropdown-item" >
                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                        Profile
                          </a>
                    <a className="dropdown-item" >
                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                        Settings
                          </a>
                    <a className="dropdown-item" >
                        <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                        Activity Log
                          </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" data-toggle="modal" data-target="#logoutModal">
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                        Logout
                          </a>
                </div>
            </div>
        )
    }
}

export default AvatarUserComponent