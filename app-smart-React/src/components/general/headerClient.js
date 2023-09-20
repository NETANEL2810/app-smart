import React from 'react'
import { Link } from 'react-router-dom'

export default function HeaderClient() {
  return (
    <header className="container-fluid bg-light p-2 shadow">
      <div className="container">
        <div className="row align-items-center">
          <div className='logo col-auto'>
            <h2>Admin</h2>
          </div>
          <div className='row col d-flex justify-content-between'>
            <div className='col-auto'>
              <ul>
                <li><Link to="/admin/users">Users</Link></li>
                <li><Link to="/admin/categories">Companies</Link></li>
                <li><Link to="/admin/apps">Devices</Link></li>
              </ul>
            </div>
            <div className='col-auto'>
              <ul>
                <li><Link to="/admin/">Login</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
