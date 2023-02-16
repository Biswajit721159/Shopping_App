import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";

export default function Updateuser() {

  const { id } = useParams();
  const navigate = useNavigate();


  let [input, setinput] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
  });

  let [name, setname] = useState("");
  let [address, setaddress] = useState("");
  let [city, setcity] = useState("");
  let [country, setcountry] = useState("INDIA");

  function submit() {
    
    input.name = name;
    input.address = address;
    input.city = city;
    input.country = country;
  
    axios.put(`http://localhost/react_crud_php/view.php/${id}/edit`, input).then((response)=>{navigate('/');  })
    
    

  }

  return (
    <div className="container mt-4">
      <h3>Your from</h3>
      <div className="col-md-6">
        <label htmlFor="inputEmail4" className="form-label">
          Your id
        </label>
        <input
          disabled={true}
          type="number"
          className="form-control"
          id="inputEmail4"
          value={id}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputEmail4" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="inputEmail4"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="inputAddress" className="form-label">
          Address
        </label>
        <input
          type="text"
          className="form-control"
          id="inputAddress"
          value={address}
          onChange={(e) => {
            setaddress(e.target.value);
          }}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="inputCity" className="form-label">
          City
        </label>
        <input
          type="text"
          className="form-control"
          id="inputCity"
          value={city}
          onChange={(e) => {
            setcity(e.target.value);
          }}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputState" className="form-label">
          Country
        </label>
        <select
              id="inputState"
              className="form-select">
              <option >Choose...</option>
              <option>India</option>
              <option>...</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary mt-4" onClick={submit}>
        Submit
      </button>
    </div>
  );
}
