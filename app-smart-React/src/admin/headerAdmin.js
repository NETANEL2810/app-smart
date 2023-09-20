import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TOKEN_KEY } from '../services/apiService'

export default function HeaderAdmin() {
  const nav = useNavigate();
  return (
    <header className="container-fluid bg-secondary p-2 shadow">
      <div className="container">
        <div className="row align-items-center">
          <div className='logo col-auto'>
            <h2>Admin</h2>
          </div>
          <div className='row col d-flex justify-content-between align-items-center'>
            <div className='col-auto'>
              {/* divide of admin connected or not */}
              {localStorage[TOKEN_KEY] ?
                <ul>
                  <li><Link to="/admin/users">Users</Link></li>
                  <li><Link to="/admin/companies">Companies</Link></li>
                  <li><Link to="/admin/devices">Devices</Link></li>
                </ul> :
                <ul>
                  <li><Link to="/">Home page</Link></li>
                  
                </ul>
              }
            </div>
            <div className='col-auto'>
              {/* divide of admin connected or not */}
              {!localStorage[TOKEN_KEY] ?
                <ul>
                  <li><Link to="/admin/">Login</Link></li>
                  <li><Link to="/admin/">signUp</Link></li>
                </ul> :
                <ul>
                  <li>
                    <button onClick={() => {
                      // remove admin token from local storge
                    localStorage.removeItem(TOKEN_KEY);
                    nav("/admin")///go back to admin login
                  }} className='btn btn-danger'>Log out</button></li>
                </ul>
              }
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
