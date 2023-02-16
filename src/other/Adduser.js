import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export default function Adduser() {
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
  let [country, setcountry] = useState("");

  function submit() {
   
    input.name = name;
    input.address = address;
    input.city = city;
    input.country = country;
    
    axios.post("http://localhost/react_crud_php/view.php", input);
  }

  return (
    <div className="container mt-4">
      <h3>User form</h3>
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
          className="form-select"
          value={country}
          onChange={(e) => {
            setcountry(e.target.value);
          }}
        >
          <option>Choose...</option>
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
