import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL, doApiGet } from '../services/apiService';

export default function AuthAdminComp() {
  const nav = useNavigate();

  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    try {
      // req for token of user
      const url = API_URL+"/users/checkToken";
      const data = await doApiGet(url);

      if(data.role != "admin"){
        alert("You must be admin to be here");
        nav("/admin")///go outside from the users list system
      }
      
    } catch (error) {
      alert("You must logged in again");
      nav("/admin")///go outside from the users list system
    }

  }

  return (
    <React.Fragment></React.Fragment>
  )
}
