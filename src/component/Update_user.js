import React,{useContext,useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { global } from '../App';
import swal from "sweetalert";
import axios from "axios";

function Update_user() {

const {Mobile,Function}=useContext(global);

const [name,setname]=useState("");
const [city,setcity]=useState("");
const [state,setstate]=useState("");
const [pin,setpin]=useState("");

const history=useNavigate();


  useEffect(()=>{
    loaduser();
  },[])

  function loaduser(){
    if(Mobile.length==0)
    {
      swal('Please Login !');
    }
  }

  
let [input, setinput] = useState({
    name: "",
    city: "",
    state:"",
    pin:"",
    mobile:""
});

function solve_name(s)
{
  if(s.lenght<=5)
  {
    return false;
  }
  else 
  {
    for(let i=0;i<s.lenght;i++)
    {
      if( (s[i]>='a'  && s[i]<='z') || (s[i]>='A'  && s[i]<='Z') )
      {
        continue;
      }
      else
      {
        return false;
      }
    }
    return true;
  }
}
function solve_city(s)
{
  if(s.lenght<=3)
  {
    return false;
  }
  else
  {
    for(let i=0;i<s.lenght;i++)
    {
      if(s[i]>='a' && s[i]<='z')
      {
        continue;
      }
      else
      {
        return false;
      }
    }
    return true;
  }
}
function solve_pin(s)
{
  if(s.length!==6)
  {
    return false;
  }
  else
  {
    for(let i=0;i<s.length;i++)
    {
      if(s[i]>='0' && s[i]<='9')
      {
        continue;
      }
      else{
        return false;
      }
    }
    return true;
  }
}
function solve_state(s)
{
  if(s.lenght<=2)
  {
    return false;
  }
  else
  {
    for(let i=0;i<s.lenght;i++)
    {
      if(s[i]>='a' && s[i]<='z')
      {
        continue;
      }
      else
      {
        return false;
      }
    }
    return true;
  } 
}
function subnit()
{
    let x=solve_name(name);
    let y=solve_state(state);
    let z=solve_pin(pin);
    let b=solve_city(city);
    if(Mobile.lenght===0)
    {
      swal('Please Log in !');
    }
    else if(x===true && y===true && z===true  && b===true)
    {
      
      input.name = name;
      input.city = city;
      input.state = state;
      input.pin = pin;
      input.mobile=Mobile;

      console.log(input);

      axios.put("http://localhost/main/New%20folder/user.php", input);
      history('/User/Dashboard');
    }
    else if(x===false)
    {
      swal("Sorry Your Name is incorrect ?", {
        buttons: [, "OK"],
      });
    }
    else if(b===false)
    {
      swal("Sorry Your city is incorrect ?", {
        buttons: [, "OK"],
      });
    }
    else if(y===false)
    {
      swal("Sorry Your State is incorrect ?", {
        buttons: [, "OK"],
      });
    }
    else if(z===false)
    {
      swal("Sorry Your Pin is incorrect ?", {
        buttons: [, "OK"],
      });
    }
    else
    {
      swal("Some Error in database please wait sometime?", {
        buttons: [, "OK"],
      });
    }
}
 

  return (
    <>
      <div className="container mt-5">
      <h3>Update Form</h3>
        <div class="col-md-4 mt-5">
          <input
            type="text"
            class="form-control"
            id="validationCustom01"
            placeholder="First name and Last Name"
            value={name}
            onChange={(e)=>setname(e.target.value)}
          />
        </div>
        <div class="col-md-4 mt-3">
          <input
            type="text"
            class="form-control"
            id="validationCustom03"
            placeholder="Full Address"
            value={city}
            onChange={(e)=>setcity(e.target.value)}
          />
        </div>
        <div class="col-md-4 mt-3">
          <select class="form-select" id="validationCustom04"  value={state} onChange={(e)=>setstate(e.target.value)}>
            <option selected disabled value="">
            State...
            </option>
            <option>West bengal</option>
            <option>Delhi</option>
            <option>Bihar</option>
            <option>UP</option>
            <option>Goa</option>
            <option>Odisha</option>
            <option>Jharkhand</option>
            <option>Mumbai</option>
          </select>
        </div>
        <div class="col-md-4 mt-3">
          <input
            type="text"
            class="form-control"
            id="validationCustom05"
            placeholder="Pin"
            value={pin}
            onChange={(e)=>setpin(e.target.value)}
          />
        </div>
        <div class="col-12 mt-4">
          <button class="btn btn-primary" type="submit" onClick={subnit}>
            Update to Go
          </button>
        </div>
        </div>
    </>
  );
}

export default Update_user;
