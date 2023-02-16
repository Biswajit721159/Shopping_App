 import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { global } from "../App";

export default function Payment() {

  const {Mobile,Function}=useContext(global);

  //const [user,setuser]=useState([]);
  const [product, setproduct] = useState([]);
  const [order,setorder]=useState([]);
  const [currentbag,setcurrentbag]=useState([]);
  const [cost, setcost] = useState(0);
  const history=useNavigate();

  const [card,setcard]=useState("");
  const[namecard,setnamecard]=useState("");
  const [expiry,setexpity]=useState("");
  const [cvv,setcvv]=useState("");

  useEffect(() => {
    loadproduct();
  }, [Mobile]);

  function findcost(currentbag,product) 
  {
      let cost=0;
      if(currentbag===undefined) return;
      else if(product==undefined) return;
      let ans=[];
      for(let i=0;i<currentbag.length;i++)
      {
          let data=0;
          for(let j=0;j<product.length;j++)
          {
              if(product[j].id==currentbag[i].product_id && product[j].current_status=="available")
              {
                  let price=change(product[j].price);
                  let offer=change(product[j].offer);
                  let product_count=change(currentbag[i].number_product);
                  data=product_count*price;
                  data=data-((data*offer)/100);

                  let obj={
                    mobile:Mobile,
                    product_id:product[j].id,
                    price:data,
                    number_product:currentbag[i].number_product,
                    date:"",
                  }
                  ans.push(obj);
              }
          }
          cost+=data;
      }
      setcost(cost);
      setorder([...ans]);
   }

  function set_beg(nums,product)
  {
    if(Mobile.length==0)
    {
      return;
    }
    else
    {
      let ans=[];
      for(let i=0;i<nums.length;i++)
      {
        if(nums[i].mobile==Mobile)
        {
          ans.push(nums[i]);
        }
      }
      setcurrentbag([...ans]);
      findcost(ans,product);
    }
  }

  const loadproduct = async () => {
    await axios.get("http://localhost/main/New%20folder/my_bag.php").then((res)=>{
      axios.get("http://localhost/main/New%20folder/main.php").then((result)=>{
        set_beg(res.data.result,result.data.result);
        //setproduct(result.data.result);
      })
    })
  };
  function change(s)
  {
    if(typeof(s)===Number)
    {
      return s;
    }
    if(s==undefined) return 0;
    let x=0;
    for(let i=0;i<s.length;i++)
    {
      x=x*10+(s[i]-'0');
    }
    return x;
  }
  function check_card(name)
  {
    if(name.length!==12)
    {
      return false;
    }
    else
    {
      for(let i=0;i<name.length;i++)
      {
        if(name[i]>='0' && name[i]<='9')
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
  function check_cvv(name)
  {
    if(name.length!==4)
    {
      return false;
    }
    else
    {
      for(let i=0;i<name.length;i++)
      {
        if(name[i]>='0' && name[i]<='9')
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
  function check_expiry(name)
  {
    if(name.length!==5)
    {
      return false;
    }
    else 
    {
      let a=name[0];
      let b=name[1];
      let c=name[2];
      let d=name[3];
      let e=name[4];
      if(c!=='/')
      {
        return false;
      }
      else if(a>='0' && a<='9'&& b>='0' && b<='9' && d>='0' && d<='9' && e>='0' && e<='9' )
      {
        return true;
      }
      else
      {
        return false;
      }
    }
  }
  function check_name(name)
  {
    if(name.length<7)
    {
      return false;
    }
    else
    {
      let count=0;
      for(let i=0;i<name.length;i++)
      {
        if((name[i]>='a' && name[i]<='z')||(name[i]>='A' && name[i]<='Z'))
        {
          continue;
        }
        else if(name[i]==' ')
        {
          count++;
        }
        else
        {
          return false;
        }
      }
      if(count==1)
      {
        return true;
      }
      else
      {
        return false;
      }
    }
  }

  const put_data = async(input) => {
    await axios.post("http://localhost/main/New%20folder/order_product.php",input);
  }

  function pay() 
  {
    const a=check_card(card);
    const b=check_name(namecard);
    const c=check_expiry(expiry);
    const d=check_cvv(cvv);
   
    if(a===true && b===true && c===true && d===true )
    {
        if(order===undefined)
        {
              return;
        }
        for(let i=0;i<order.length;i++)
        {
              const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
              const current = new Date();
              const date = `${ monthNames[current.getMonth()]} ${current.getDate()}`;
              order[i].date=date;
              if(order[i].number_product!=0)
              {
                //console.log(order[i]);
                put_data(order[i]);
              }
        }
        history(`/User/Dashboard`);
    }
    else if(a===false)
    {
      swal("Sorry Card Number is incorrect ?", {
        buttons: [, "OK"],
      });
    }
    else if(b===false)
    {
      swal("Sorry Card Name is incorrect ?", {
        buttons: [, "OK"],
      });
    }
    else if(c===false)
    {
      swal("Sorry Card Expiry is incorrect ?", {
        buttons: [, "OK"],
      });
    }
    else if(d===false)
    {
      swal("Sorry Card CVV is incorrect ?", {
        buttons: [, "OK"],
      });
    }
    else
    {
      swal("Sorry Your Card detail  is incorrect ?", {
        buttons: [, "OK"],
      });
    }
  }

  return (
    <>
      <div className="container">
        <h1 className="h3 mb-5 mt-5"> Safe Payment</h1>
        <div className="col-lg-7" style={{backgroundColor:'yellow'}}>
          <div className="accordion" id="accordionPayment">
            <div className="accordion-item mb-3">
              <div
                id="collapseCC"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionPayment"
              >
                <div className="accordion-body">
                  <div className="mb-3">
                    <label className="form-label">Card Number</label>
                    <input type="text" className="form-control" placeholder="" value={card} onChange={(e)=>setcard(e.target.value)} />
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">Name on card</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          value={namecard} onChange={(e)=>setnamecard(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mb-3">
                        <label className="form-label">Expiry date</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="MM/YY"
                          value={expiry} onChange={(e)=>setexpity(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mb-3">
                        <label className="form-label">CVV Code</label>
                        <input type="text" className="form-control" value={cvv} onChange={(e)=>setcvv(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-primary" onClick={pay}>
                      Pay {cost}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
