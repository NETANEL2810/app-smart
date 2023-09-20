import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';


export default function AddDeviceForm() {
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [arr_companies,setSelectAr] = useState([])

  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    try {
      // diffine url
      const url = API_URL + "/companies";
      const data = await doApiGet(url);
      // console.log(data);
      setSelectAr(data);//update the arr
    } catch (error) {
      console.log(error);
    }
  }

  const onSubForm = (_bodyData) => {
    console.log(_bodyData);
    doApiPost(_bodyData)
  }

  const doApiPost = async(_bodyData) => {
    try{
      const url = API_URL + "/devices";
      const data = await doApiMethod(url, "POST", _bodyData);
      if(data._id){
        alert("device added")
        nav("/admin/devices")
      }
    }
    catch(err){
      console.log(err);
    }
  }


  return (
    <div className='container'>
      <h1>Add new device</h1>
      { arr_companies.length > 0 ? 
      <form onSubmit={handleSubmit(onSubForm)} className='col-md-6'>
        <label>Name</label>
        <input {...register("name", { required: true, minLength: 2 })} className="form-control" type="text" />
        {errors.name && <div className="text-danger">* Enter valid name (min 2 chars)</div>}
        <label>Company id</label>
        <select {...register("company_id", { required: true, minLength: 1 })} className="form-select" type="select" >
          {arr_companies.map(item => {
            return (
              <option key={item._id} value={item.company_id}>{item.name}</option>
            )
          })}
        </select>
        <label>Battery score</label>
        <input defaultValue={70} {...register("battery_score", { required: true, min:1 ,max:100 })} className="form-control" type="number" />
        {errors.battery_score && <div className="text-danger">* Enter valid battery score (1 to 100)</div>}
        <label>Camera score</label>
        <input defaultValue={70}  {...register("camera_score", { required: true, min:1 ,max:100 })} className="form-control" type="number" />
        {errors.camera_score && <div className="text-danger">* Enter valid camera score (1 to 100)</div>}
        <label>Price</label>
        <input defaultValue={900}  {...register("price", { required: true, min:1 ,max:9999 })} className="form-control" type="number" />
        {errors.price && <div className="text-danger">* Enter valid price (1 to 9999)</div>}
        <button className='btn btn-success mt-3'>Add device</button>
      </form>
        : <h2>Loading...</h2>
        }
    </div>
  )
}
