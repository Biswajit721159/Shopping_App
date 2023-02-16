import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { global } from "../App";
import swal from "sweetalert";

export default function Mybag() {

 const {Mobile,Function,child,update}=useContext(global);

 const [product,setproduct]=useState([]); 
 const [currmybag,setcurrmybag]=useState([]);
 const [totalcost,settotalcost]=useState(0); //for calculated price of my bag

 const [index,setindex]=useState("first");
  
  useEffect(()=>{
    loadbag();
  },[]);
  useEffect(() => {
    loadbag();
  }, [Mobile]);
  useEffect(()=>{
    loadbag();
  },[index]);
  

  
  let loadbag = async ()=>{
     axios.get("http://localhost/main/New%20folder/main.php").then((resdata)=>{
        axios.get("http://localhost/main/New%20folder/my_bag.php").then((res)=>{
        setcurrmybag(res.data.result);
        setInTOproduct(resdata.data.result,res.data.result);
      })
    })
  }
  const REMOVE_TO_CART = (id) => {
     axios.delete(`http://localhost/main/New%20folder/my_bag.php/${id}`).then(()=>{ 
      loadbag();
    })
  }
  function checkTheProductIsAllReadyExit(id)
  {
    let ans=-1;
    if(currmybag===undefined) return ans;
    else{
      for(let i=0;i<currmybag.length;i++)
      {
        if(currmybag[i].mobile==Mobile && currmybag[i].product_id==id)
        {
          return currmybag[i].number_product;
        }
      }
      return ans;
    }
  }
  function chengeToInteger(data)
  {
    if(typeof(data)==Number) return data;
    let ans=0;
    for(let i=0;i<data.length;i++)
    {
      ans=ans*10+(data[i]-'0');
    }
    return ans;
  }
  function updateProductCount(id,data)
  {
    for(let i=0;i<product.length;i++)
    {
      if(product[i].id==id)
      {
        product[i].product_count=data;
        break;
      }
    }
    setproduct([...product]);
  }
  function ADD_TO_INCREMENT(id){
    if(Mobile.length==0)
    {
      swal(`Please Login `);
    }
    else
    {
          let mybag={ mobile: "", product_id: 0, number_product: 0};
          let ans=checkTheProductIsAllReadyExit(id);
          if(ans!=-1)
          {
              mybag.product_id=id;
              mybag.mobile=Mobile;
              mybag.number_product=chengeToInteger(ans)+1;
              axios.put("http://localhost/main/New%20folder/my_bag.php", mybag).then(()=>{
                  axios.get("http://localhost/main/New%20folder/my_bag.php").then((res)=>{
                      setcurrmybag(res.data.result);
                      updateProductCount(id,mybag.number_product);
                      findcost(product);
                      setInTOproduct(product,res.data.result);
                      if(index!="incre_first")
                      {
                        setindex("incre_first");
                        child("incre_first");
                      }
                      else if(index!="incre_second")
                      {
                        setindex("incre_second");
                        child("incre_second");
                      }
                  })
              })
          }
          else
          {
              mybag.product_id=id;
              mybag.mobile=Mobile;
              mybag.number_product=1;
              axios.post("http://localhost/main/New%20folder/my_bag.php", mybag).then(()=>{
                axios.get("http://localhost/main/New%20folder/my_bag.php").then((res)=>{
                    setcurrmybag(res.data.result);
                    updateProductCount(id,mybag.number_product);
                    findcost(product);
                    setInTOproduct(product,res.data.result);
                    if(index!="incre_first")
                    {
                      setindex("incre_first");
                      child("incre_first");
                    }
                    else if(index!="incre_second")
                    {
                      setindex("incre_second");
                      child("incre_second");
                    }
                })
             })
          }
          
     }
  }
  function ADD_TO_DECREMENT(id){ 
    if(Mobile.length==0)
    {
    swal(`Please Login `);
    }
    else
    {
        let mybag={ mobile: "", product_id: 0, number_product: 0};
        let ans=checkTheProductIsAllReadyExit(id);
        if(ans!=0)
        {
            mybag.product_id=id;
            mybag.mobile=Mobile;
            mybag.number_product=chengeToInteger(ans)-1;
            if(mybag.number_product!=-1)
            {
              axios.put("http://localhost/main/New%20folder/my_bag.php", mybag).then(()=>{
                axios.get("http://localhost/main/New%20folder/my_bag.php").then((res)=>{
                    setcurrmybag(res.data.result);
                    updateProductCount(id,mybag.number_product);
                    findcost(product);
                    setInTOproduct(product,res.data.result);
                    if(index!="decre_first")
                    {
                      setindex("decre_first");
                      child("decre_first");
                    }
                    else if(index!="decre_second")
                    {
                      setindex("decre_second");
                      child("decre_second");
                    }
                })
              })
            }
            else
            {
              
              swal('Sorry This Product is not to your bag!');
            }
        }
        else
        {
            swal('Sorry This Product is not to your bag!');
        }
    }
  }
  function findcost(user)
  {
    
      let cost=0;
      for(let i=0;i<user.length;i++)
      {
          if(user[i].current_status=="available")
          {
            let s=chengeToInteger(user[i].price);
            let product_count=chengeToInteger(user[i].product_count);
            let offer=chengeToInteger(user[i].offer);
            cost=cost+product_count*s;
            cost=cost-(product_count*s*offer)/100;
          }
      }
      settotalcost(cost);
  }
  function setInTOproduct(nums,currmybag)
  {
      let ans=[];
      for(let i=0;i<nums.length;i++)
      {
        let obj={
          id:0,
          product_name:"",
          view:0,
          product_url:"",
          price:0,
          vage:"",
          offer:0,
          current_status:"",
          product_count:0
        }
        obj.id=nums[i].id;
        obj.product_name=nums[i].product_name
        obj.view=nums[i].view;
        obj.product_url=nums[i].product_url;
        obj.price=nums[i].price;
        obj.vage=nums[i].vage;
        obj.offer=nums[i].offer;
        obj.current_status=nums[i].current_status;
        if(Mobile.length==10)
        {
          for(let j=0;j<currmybag.length;j++)
          {
            if(Mobile==currmybag[j].mobile && nums[i].id==currmybag[j].product_id)
            {
              obj.product_count=currmybag[j].number_product;
              ans.push(obj);
            }
          }
        }
      }
      setproduct([...ans]);
      findcost(ans);
  }


  return (
    <div className="container">
      {
        product.length!==0  ?<div className="row mt-4">
        {product !== undefined
          ? product.map((item, ind) => (
              <div className="card-shadow mt-3 mx-4" style={{ width: 230 }} key={ind}>
                <img
                  src={item.product_url}
                  className="card-img-top"
                  style={{ width: 210, height: 150 }}
                  alt="Please Wait"
                />
                <div className="card-body">
                  <h6 className="card-title">{item.product_name}</h6>
                  <h5 className="card-text">₹{item.price}</h5>
                  
                  {item.view == 1 ? (
                    <div className="stars" style={{ color: "green" }}>
                      <i className="fas fa-star"></i>
                    </div>
                  ) : item.view == 2 ? (
                    <div className="stars" style={{ color: "green" }}>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  ) : item.view == 3 ? (
                    <div className="stars" style={{ color: "green" }}>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  ) : item.view == 4 ? (
                    <div className="stars" style={{ color: "green" }}>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  ) : (
                    <div className="stars" style={{ color: "green" }}>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  )}
                  {
                 item.current_status=='not available'?
                 <div className="row">
                    <div className="container col-sm">
                    <h5 className="card-text" style={{color:'lightgray'}}>Closed</h5>
                    </div>
                    <div className="container col-sm">
                       <h5 className="card-text" style={{color:'tomato'}}>₹{(item.price-((item.price*item.offer)/100))}</h5>
                    </div>
                </div>
                 :
                 <div className="row">
                    <div className="container col-sm">
                       <h5 className="card-text" style={{color:'green'}}>Available</h5>
                    </div>
                    <div className="container col-sm">
                       <h5 className="card-text" style={{color:'tomato'}}>₹{(item.price-((item.price*item.offer)/100))}</h5>
                    </div>
                </div>
                 
              }
              {
                 item.current_status=='not available'?


                 item.product_count==0?
                 <button className="btn btn-secondary rounded-pill btn-sm mt-2" disabled >
                  <button className="btn btn-secondary rounded-pill btn-sm mx-3"> - </button>
                      ADD
                   <button className="btn btn-secondary rounded-pill btn-sm mx-3"> + </button>
                </button>
                :
                <button className="btn btn-secondary rounded-pill btn-sm mt-2 disabled"  >
                  <button className="btn btn-secondary rounded-pill btn-sm mx-3"> - </button>
                      {item.product_count} 
                  <button className="btn btn-secondary rounded-pill btn-sm mx-3"> + </button>
              </button>


                :


                item.product_count==0?
                <button className="btn btn-primary rounded-pill btn-sm mt-2" >
                  <button className="btn btn-danger rounded-pill btn-sm mx-3" onClick={()=>REMOVE_TO_CART(item.id)}> REMOVE </button>
                   <button className="btn btn-primary rounded-pill btn-sm mx-3" onClick={()=>ADD_TO_INCREMENT(item.id)}> ADD </button>
                </button>
                :
                <button className="btn btn-primary rounded-pill btn-sm mt-2">
                  <button className="btn btn-primary rounded-pill btn-sm mx-3" onClick={()=>ADD_TO_DECREMENT(item.id)}> - </button>
                      {item.product_count} 
                  <button className="btn btn-primary rounded-pill btn-sm mx-3" onClick={()=>ADD_TO_INCREMENT(item.id)}> + </button>
              </button>



              }
                </div>
              </div>
            ))
          : ""}
          <nav className="navbar navbar-expand-lg  bg-success my-5 mx-4 col-lg-10">
            <div className="container">
              <div className="d-flex">
                 {
                 <button className="btn btn-success" disabled={true}> <h4>Total Cost -{totalcost}</h4></button>
                 }
              </div>
              <div className="d-flex">
                 {
                  
                 }
              </div>
              <div className="d-flex">
                 {
                  totalcost!==0? <Link to={`${totalcost}/Payment`}><button className="btn btn-warning rounded-pill btn-sm"> <h4>pay now</h4></button></Link>:""
                 }
              </div>
            </div>
      </nav>
            </div>:<div className="container mt-5">
                  <h1>Please add some product !</h1>
            </div>
      }
    </div>
  );
}
