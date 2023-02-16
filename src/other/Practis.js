import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Updateuser from "./Updateuser";
export default function () {

 

  const [user, setuser] = useState([]);
  
  useEffect(() => {
    loaduser();
  }, []);


  const loaduser = async () => {
    let result = await axios.get("http://localhost/react_crud_php/view.php");
    setuser(result.data.result);
  };


  const deleteUser = (id) => {
    axios.delete(`http://localhost/react_crud_php/view.php/${id}`).then(function(response){
        loaduser();
    });
}


  return (
    <div className="container">
      <table className="table table-light table-striped-columns mt-4">
        <thead>
          <tr>
            <th scope="col">Index</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">City</th>
            <th scope="col">Country</th>
            <th>Action-1</th>
            <th>Action-2</th>
            <th>Action-3</th>
          </tr>
        </thead>
        <tbody>
          {user !== undefined
            ? user.map((item, ind) => (
                <tr key={ind}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.city}</td>
                  <td>{item.country}</td>
                  <td>
                    <Link to={`/adduser`}><button className="btn btn-primary">Adduser</button></Link>
                  </td>
                  <td>
                  <Link to={`user/${item.id}/edit`} ><button className="btn btn-info "  >Update </button>   </Link>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => deleteUser(item.id)}>Delete</button>
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </div>
  );
}
