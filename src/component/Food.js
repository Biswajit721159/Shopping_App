import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import swal from "sweetalert";
import "../App.css";
import {global} from '../App';


export default function () {
  
  const [user, setuser] = useState([]);
  const [product,setproduct]=useState([]);
  const [currmybag,setcurrmybag]=useState([]);
  
  
  //for filtering purpase
  const [price_low_high,setprice_low_high]=useState(false);
  const [price_high_low,setprice_high_low]=useState(false);
  const [briyani,setbriyani]=useState(false);
  const [vage,setvage]=useState(false);
  const [notvage,setnonvage]=useState(false);
  const [name,setname]=useState("");


  const [index,setindex]=useState("first");
  
  


  const {Mobile,Function,child,update}=useContext(global);

  
  // product and user loder section 
  let loadbag = async ()=>{
    axios.get("http://localhost/main/New%20folder/main.php").then((resdata)=>{
       axios.get("http://localhost/main/New%20folder/my_bag.php").then((res)=>{
       setcurrmybag(res.data.result);
       setInTOproduct(resdata.data.result,res.data.result);
     })
   })
   
 }

  useEffect(()=>{
    loadbag();
  },[]);
  useEffect(()=>{
    loadbag();
  },[Mobile]);
  useEffect(()=>{
    loadbag();
  },[update]);



  useEffect(() => {
    searchproduct();
  }, [name]);
  useEffect(()=>{
    sort_assending();
  },[price_low_high]);
  useEffect(()=>{
    sort_decanding();
  },[price_high_low]);
  useEffect(()=>{
    searchbriyani();
  },[briyani]);
  useEffect(()=>{
    searchvage();
  },[vage]);
  useEffect(()=>{
    searchnonvage();
  },[notvage]);

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
          }
        }
      }
      ans.push(obj);
    }
    setproduct([...ans]);
    setuser([...ans]);
    sortproduct(ans);
}
//sort by nonvage
function searchnonvage()
{
  // console.log(user);
  // console.log(product);
  if(notvage==false)
  {
    setproduct(user);
    sortproduct(user);
  }
  else
  {
    let arr=[];
    for(let i=0;i<product.length;i++)
    {
      if(product[i].vage!="vage")
      {
        arr.push(product[i]);
      }
    }
    setproduct([...arr]);
    sortproduct(arr);
  }
}
//sort by vage
function searchvage()
{
  if(vage==false)
  {
    setproduct(user);
    sortproduct(user);
  }
  else
  {
    let arr=[];
    for(let i=0;i<product.length;i++)
    {
      if(product[i].vage=="vage")
      {
        arr.push(product[i]);
      }
    }
    setproduct([...arr]);
    sortproduct(arr);
  }
}
//sort by briyani
function searchbriyani()
{
  if(product===undefined) return;
  if(briyani==false)
  {
    setproduct(user);
    sortproduct(user);
  }
  else
  {
    let name_pro="briyani";
    name_pro=name_pro.toLowerCase();
    let newproduct=[];
    for(let i=0;i<product.length;i++)
    {
        let s=product[i].product_name;
        s=s.toLowerCase();
        if (KMP(name_pro,s)===true || check_All_Charcter(name_pro,s)) 
        {
          newproduct.push(product[i]);
        }
    }
    setproduct([...newproduct]);
    sortproduct(newproduct);
  }
}
//high to low
function sort_decanding()
{
  if(product===undefined) return;
  if(price_high_low==false)
  {
    setproduct(user);
    sortproduct(user);
  }
  else
  {
    let arr=product;
    for(let i=0;i<arr.length;i++)
    {
      for(let j=i+1;j<arr.length;j++)
      {
        let a=change(arr[i].price);
        let b=change(arr[j].price);
        if(a < b)
        {
          let temp=arr[i];
          arr[i]=arr[j];
          arr[j]=temp;
        }
      }
    }
    setproduct([...arr]);
    sortproduct(arr);
  }
}
function change(s)
{
  if(typeof(s)===Number)
  {
    return s;
  }
  let x=0;
  for(let i=0;i<s.length;i++)
  {
    x=x*10+(s[i]-'0');
  }
  return x;
}
//sort by low to high
function sort_assending()
{
  if(product===undefined) return;
  if(price_low_high==false)
  {
    setInTOproduct(user);
  }
  else
  {
    let arr=product;
    for(let i=0;i<arr.length;i++)
    {
      for(let j=i+1;j<arr.length;j++)
      {
        let a=change(arr[i].price)
        let b= change(arr[j].price);
        if(a > b)
        {
          let temp=arr[i];
          arr[i]=arr[j];
          arr[j]=temp;
        }
      }
    }
    setproduct([...arr]);
    sortproduct(arr);
  }
}
//search section 
function KMP(searchproduct,product_name)
{
    let patt=solve1(searchproduct);
    let original=solve2(product_name);
    let n=patt.length;
    for(let i=0;i<original.length-n+1;i++)
    {
       let generate=original.substring(i,i+n);
       if(generate===patt) return true;
    }
    return false;
}
function check_All_Charcter(searchproduct,product_name){
  let s=product_name;
  let patt=searchproduct;
  let i=0;
  let j=0;
  let n=s.length;
  let m=patt.length;
  while(i<n && j<m)
  {
    if(patt[j]==s[i])
    {
      i++;j++;
    }
    else
    {
      i++;
    }
  }
  if(j==m)
  {
    return true;
  }
  return false;
}
function searchproduct()
{
  if(user===undefined) return;
  else if(name.length===0)
  {
    setInTOproduct(user);
  }
  else
  {
    setname(name.toLowerCase());
    let n=name.length;
    let newproduct=[];
    for(let i=0;i<user.length;i++)
    {
        let s=user[i].product_name;
        s=s.toLowerCase();
        if (KMP(name,s)===true || check_All_Charcter(name,s)) 
        {
          newproduct.push(user[i]);
        }
    }
    setproduct([...newproduct]);
    sortproduct(newproduct);
  }
}
function solve1(s)
{
  let res="";
  for(let i=0;i<s.length;i++)
  {
    if(s[i]>='a' && s[i]<'z')
    {
      res+=s[i];
    }
  }
  return res;
} 
function solve2(s)
{
  let res="";
  for(let i=0;i<s.length;i++)
  {
    if(s[i]>='a' && s[i]<'z')
    {
      res+=s[i];
    }
  }
  return res;
}

//sort all product
function sortproduct(product)
{
  let arr=product;
  if(product===undefined)
  {
    return ;
  }
  else
  {
    let arr=[];
    for(let i=0;i<product.length;i++)
    {
      if(product[i].current_status=='available')
      {
        arr.push(product[i]);
      }
    }
    for(let i=0;i<product.length;i++)
    {
      if(product[i].current_status!='available')
      {
        arr.push(product[i]);
      }
    }
    setproduct([...arr]);
    //setuser([...arr]);
  }
}

// Add to Bag section 
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
  setuser([...product]);
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
              updateProductCount(id,mybag.number_product);
              axios.put("http://localhost/main/New%20folder/my_bag.php", mybag).then(()=>{
                axios.get("http://localhost/main/New%20folder/my_bag.php").then((res)=>{
                    setcurrmybag(res.data.result);
                    updateProductCount(id,mybag.number_product);
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





  return (
    <>
    
<div className="container" >
<div className="container" >
        
<div className="row">
        <div className="container col-sm mt-1">
              <div className="form-check mt-2">
                <input className="form-check-input" type="checkbox" checked={price_low_high} onChange={(e)=>setprice_low_high(e.target.checked)}  id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault" >
                  Price Low to High
                </label>
              </div>
        </div>
        <div className="container col-sm mt-1">
              <div className="form-check mt-2">
                <input className="form-check-input" type="checkbox" checked={price_high_low} onChange={(e)=>setprice_high_low(e.target.checked)} value="" id="flexCheckDefault"/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                Price High to Low
                </label>
              </div>
        </div>
        <div className="container col-sm mt-1">
              <div className="form-check mt-2">
                <input className="form-check-input" type="checkbox" checked={briyani} onChange={(e)=>setbriyani(e.target.checked)} id="flexCheckDefault"/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                Briyani
                </label>
              </div>
        </div>
        
        <div className="container col-sm mt-1">
              <div className="form-check mt-2">
                <input className="form-check-input" type="checkbox" checked={vage} onChange={(e)=>setvage(e.target.checked)} id="flexCheckDefault"/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                Vage Food
                </label>
              </div>
        </div>
        <div className="container col-sm mt-1">
              <div className="form-check mt-2">
                <input className="form-check-input" type="checkbox" checked={notvage} onChange={(e)=>setnonvage(e.target.checked)} id="flexCheckDefault"/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                Non Vage Food
                </label>
              </div>
        </div>
        <div className="container col-sm mt-2">
          <div className="container">
          <input
                type="text"
                className="form-control"
                value={name} onChange={(e)=>setname(e.target.value)} autoComplete='off'  placeholder="Search Product"
              />
          </div>
        </div>
</div>
    </div >
      <div className="row">
        {product !== undefined && product.length!==0
          ? product.map((item, ind) => (
            <div className="card-shadow mt-4 mx-4 my-4" style={{ width: 200 }} key={ind}>
            <img
              src={item.product_url}
              className="card-img-top"
              style={{ width: 200, height: 150,marginLeft:0,marginTop:10 }}
              alt="Please Wait"
            />
            <div className="card-body">
              <h6 className="card-title">{item.product_name}</h6>
              <div className="row">
                <div className="container col">
                   <h5 className="card-text" style={{color:'orange'}}>{item.offer}% OFF</h5>
                </div>
                <div className="container col">
                   <h5 className="card-text" style={{color:'gray'}}><s>₹{item.price}</s></h5> 
                </div>
              </div>
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
                <button className="btn btn-secondary rounded-pill btn-sm mt-2"  >
                  <button className="btn btn-secondary rounded-pill btn-sm mx-3"> - </button>
                      {item.product_count} 
                  <button className="btn btn-secondary rounded-pill btn-sm mx-3"> + </button>
              </button>


                :


                item.product_count==0?
                <button className="btn btn-primary rounded-pill btn-sm mt-2" >
                  <button className="btn btn-primary rounded-pill btn-sm mx-3" onClick={()=>ADD_TO_DECREMENT(item.id)}> - </button>
                      ADD
                   <button className="btn btn-primary rounded-pill btn-sm mx-3" onClick={()=>ADD_TO_INCREMENT(item.id)}> + </button>
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
          : <h2 className="col-md-12 text-center" id="notfound">Product Not Found  ! </h2>}
      </div>
    </div>
    </>
  );
}
