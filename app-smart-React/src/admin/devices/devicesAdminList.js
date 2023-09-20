import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";
import PagesBtns from "../../components/general/pagesBtns";

export default function DevicesAdminList() {
  const [arr_devices, setAr] = useState([]);
  const [query] = useSearchParams();
  const nav = useNavigate();

  useEffect(() => {
    // do call api - each time the query chang!!!
    doApi();
  }, [query]);

  const doApi = async () => {
    // diffine the url and the page
    // ollect page
    const page = query.get("page") || 1;
    const url = API_URL + "/devices?page=" + page;

    try {
      const data = await doApiGet(url);
      console.log(data);
      setAr(data);
    } catch (error) {
      console.log(error);
    }
  };
  const onDelClick = async (_delId) => {
    if (window.confirm("ary you sure delete this device ?")) {
      try {
        // do req for delete
        const url = API_URL + "/devices/" + _delId;
        const data = await doApiMethod(url, "DELETE");
        if (data.deletedCount) {
          doApi(); ///do the api again - withput the devices has been deleted.
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container">
      <h2>List of devices in the system</h2>
      <Link className="btn btn-dark my-3" to="/admin/devices/add">
        Add new device
      </Link>
      <div>
        <PagesBtns
          // send the props
          linkTo={"/admin/devices?page="}
          cssClass="btn btn-dark ms-2"
          apiUrl={API_URL + "/devices/count"}
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Company ID</th>
            <th>Battery score</th>
            <th>Camera score</th>
            <th>Price</th>
            <th>Date</th>
            <th>Del/Edit</th>
          </tr>
        </thead>
        <tbody>
          {arr_devices.map((item, i) => {
            // diffine the page in the query
            const page = query.get("page") || 1;
            return (
              <tr key={item._id}>
                <td>{(page - 1) * 10 + i + 1}</td>
                <td>{item.name}</td>
                <td>{item.company_id}</td>
                <td>{item.battery_score}</td>
                <td>{item.camera_score}</td>
                <td>{item.price}</td>
                <td>{item.date_created.substring(0, 10)}</td>
                <td>
                  <button
                    onClick={() => {
                      onDelClick(item._id);
                    }}
                    className="btn btn-danger"
                  >
                    Del
                  </button>
                  <button
                    onClick={() => {
                      nav("/admin/devices/edit/" + item._id);
                    }}
                    className="btn btn-info ms-2 text-light"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
