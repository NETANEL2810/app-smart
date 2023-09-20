import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { Link, useSearchParams, useNavigate } from "react-router-dom";

export default function CompaniesAdminList() {
  const [arr_comanies, setAr] = useState([]);
  const nav=useNavigate();

  useEffect(() => {
    doApi();
  }, [])

  const doApi = async () => {
    // diffine the companies
    const url = API_URL + "/companies";

    try {
      // get list of company
      const data = await doApiGet(url)
      console.log(data);
      setAr(data)
    }
    catch (error) {
      console.log(error);
    }
  }
  // delete id accoeding id
  const onDelClick=async(_delItem)=>{
    // window.alert(_delItem)
    // do del req for this item
    if (window.confirm("ary you sure delete this device ?")) {
      try {
        // do req for delete
        const url = API_URL + "/companies/" + _delItem;
        const data = await doApiMethod(url, "DELETE");
        if (data.deletedCount) {
          doApi(); ///do the api again - withput the devices has been deleted.
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className='container'>
      <h2>List of companies in the system</h2>
      <Link className="btn btn-dark my-3" to="/admin/companies/add">
        Add new company
      </Link>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Company ID</th>
            <th>Del/Edit</th>
          </tr>
        </thead>
        <tbody>
          {arr_comanies.map((item,i) => {
            return (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.company_id}</td>
                <td>
                  <button onClick={()=>{
                    // window.alert(item._id)
                    onDelClick(item._id)
                  }} className='btn btn-danger'>Del</button>
                  <button onClick={()=>{
                    // window.alert(item._id);
                    nav("/admin/companies/edit/"+item._id); 
                  }} className='btn btn-info ms-2 text-light'>Edit</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
