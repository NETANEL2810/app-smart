import React, { useEffect, useState } from 'react'
import { API_URL, TOKEN_KEY, doApiGet } from '../../services/apiService';
import axios from 'axios';
import AuthAdminComp from '../authAdminComp';

export default function UsersAdminList() {
  // diffine state!
  const [arr_users, setAr] = useState([]);

  useEffect(() => {
    doApi();
  }, [])

  const doApi = async () => {
    const url = API_URL + "/users/usersList";
   
    try {
      // api for list of user - only admin!
      const data = await doApiGet(url)
      console.log(data);
      setAr(data)
    } 
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='container'>
      {/* gurntee that the user can stay and see users lisr only if he admin */}
      {/* <AuthAdminComp /> */}
      <h2>List of users in the system</h2>
      <table className='table table-striped  border-2'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>email</th>
            <th>role</th>
            <th>Del/Edit</th>
          

          </tr>
        </thead>
        <tbody>
          {arr_users.map((item,i) => {
            return (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <button className='btn btn-danger mx-2'>Del</button>
                  <button className='btn btn-info'>Edit</button>
                </td>
                
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
