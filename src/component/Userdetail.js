
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { global } from '../App';
export default function Userdetail() {


  const {Mobile,Function}=useContext(global);
  const [user,setuser]=useState([]);
  const [search,setsearch]=useState([]);

  useEffect(()=>{
    loaduser();
  },[Mobile]);


  function finduser(user)
  {
     if(Mobile.length!=10)
     {
      setsearch("");
     }
      for(let i=0;i<user.length;i++)
      {
        if(user[i].mobile===Mobile)
        {
          setsearch(user[i]);
        }
      }
  }

  const loaduser = async () => {
    let result = await axios.get("http://localhost/main/New%20folder/user.php");
    setuser(result.data.result);
    finduser(result.data.result);
  };
  return (
    <div className='container mt-5'>
       <h3 style={{color:'green'}}>Mobile Number is  :- {Mobile} </h3>
       <h3 style={{color:'green'}}>Name is :- {search.name} </h3>
       <h4 style={{color:'green'}}>Address is :- {search.city} </h4>
       <h4 style={{color:'green'}}>State is :- {search.state} </h4>
       <h4 style={{color:'green'}}>Pin is :- {search.pin} </h4>
       <Link to={'/update/detail'}><button className='btn btn-primary mt-5'>Update your detail</button></Link>
       {
           search!==undefined?<Link to={`/MyOrder`}><button className='btn btn-warning mt-5 mx-5'>My Order </button></Link>:""
       }
    </div>
  )
}
