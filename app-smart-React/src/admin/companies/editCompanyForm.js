import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCompanyForm() {
  const nav = useNavigate();
  const params = useParams();
  const [comapny_data, setData] = useState({});
  // diffine variable for the form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    doApi(); ///api - for single according id
  }, []);
  //   diffine function to act on the submit
  const onSubForm = (_bodyData) => {
    // collect data affter changes
    console.log(_bodyData);
    doApiedit(_bodyData);
  };
//   do Api change by id
  const doApiedit = async (_bodyData) => {
    try {
      const url = API_URL + "/companies/" + params["id"];
      const data = await doApiMethod(url, "PUT", _bodyData);
      if (data.modifiedCount) {
        window.alert("company has been changed");
        // nav("/admin/companies"); ///go to companlist
        nav(-1);//go back
      }
    } catch (error) {
      console.log(error);
    }
  };
  //   diffine function of doApi GET by id comapny
  const doApi = async () => {
    try {
      // diffine url
      const url = API_URL + "/companies/single/" + params["id"];
      const data = await doApiGet(url); ///get api res
      console.log(data);
      setData(data); //diffine and opdata the data
      //   if(data._id){
      //     alert("company has been added")
      //     nav("/admin/companies")///go to companlist
      //   }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2>Edit comany form</h2>
      {comapny_data.name ? (
        <form
          onSubmit={handleSubmit(onSubForm)}
          className="col-md-6  shadow"
          id="id_form"
        >
          <label>name</label>
          <input
            defaultValue={comapny_data.name}
            {...register("name", { required: true, minLength: 2 })}
            className="form-control"
            type="text"
          />
          {errors.name && <div className="text-danger">* Enter valid name</div>}
          <label>company id</label>
          <input
            defaultValue={comapny_data.company_id}
            {...register("company_id", { required: true, minLength: 1 })}
            className="form-control"
            type="number"
          />
          {errors.company_id && (
            <div className="text-danger">* Enter valid company id</div>
          )}
          <label>img url</label>
          <input
            defaultValue={comapny_data.img_url}
            {...register("img_url", { required: true, minLength: 2 })}
            className="form-control"
            type="text"
          />
          {errors.img_url && (
            <div className="text-danger">* Enter valid img url</div>
          )}
          <button className="btn btn-warning my-3">upDate company</button>
        </form>
      ) : (
        <h2>loading..</h2>
      )}
    </div>
  );
}
