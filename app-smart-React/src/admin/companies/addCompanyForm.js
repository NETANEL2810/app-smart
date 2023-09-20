import React from "react";
import { useForm } from "react-hook-form";
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';

export default function AddCompanyForm() {
    const nav=useNavigate();
  // diffine variable for the form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

//   diffine function to act on the submit
const onSubForm = (_bodyData) => {
    // collect data
    // console.log(_bodyData);
    doApiPost(_bodyData)
  }
//   diffine function of doApi post
const doApiPost = async(_bodyData) => {
    console.log(_bodyData);
    try{
      const url = API_URL + "/companies";
      const data = await doApiMethod(url, "POST", _bodyData);
      if(data._id){
        alert("company has been added")
        nav("/admin/companies")///go to companlist
      }
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className="container">
      <h2>add new company to the system</h2>
      <form onSubmit={handleSubmit(onSubForm)} className='col-md-6  shadow' id="id_form">
        <label>name</label>
        <input placeholder="enter name company"
          {...register("name", { required: true, minLength: 2 })}
          className="form-control"
          type="text"
        />
        {errors.name && <div className="text-danger">* Enter valid name</div>}
        <label>company id</label>
        <input placeholder="enter company id"
          {...register("company_id", { required: true, minLength: 1})}
          className="form-control"
          type="number"
        />
        {errors.company_id && (
          <div className="text-danger">* Enter valid company id</div>
        )}
        <label>img url</label>
        <input placeholder="enter img url "
          {...register("img_url", { required: true, minLength: 2 })}
          className="form-control"
          type="text"
        />
        {errors.img_url && (
          <div className="text-danger">* Enter valid img url</div>
        )}
        <button className="btn btn-secondary my-3">add company</button>
      </form>
    </div>
  );
}
