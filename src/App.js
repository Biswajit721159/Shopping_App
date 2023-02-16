import "./App.css";

import React from "react";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Food from "./component/Food";
import Mybag from "./component/Mybag";
import Payment from "./component/Payment";
import Error from "./component/Error";
import Register from "./component/Register";
import Userdetail from "./component/Userdetail";
import MyOrder from "./component/MyOrder";
import { createContext, useState } from "react";
import Update_user from "./component/Update_user";
import TechnicalSupport from "./component/TechnicalSupport";
import About from "./component/About";


export const global=createContext();




function App() {

  const [mobile,setmobile]=useState("");
  const [update,setupdate]=useState("normal");
  function solve_Food(mobile)
  {
    setmobile(mobile);
  }
  function updateData(data)
  {
    setupdate(data);
  }

  return (
    <>
    <global.Provider value={{Mobile:mobile,Function:solve_Food,child:updateData,update}}>
      <Router>
        <Navbar/>
         <Routes>
           <Route path="/" element={ <Food/>}></Route>
           <Route path="Mybag" element={<Mybag />}></Route>
           <Route path="Mybag/:rupes/Payment" element={<Payment/>}></Route>
           <Route path="Register" element={<Register/>}></Route>
           <Route path="User/Dashboard" element={<Userdetail/>}></Route>
           <Route path="/MyOrder" element={<MyOrder/>}></Route>
           <Route path="/update/detail" element={<Update_user/>}></Route>
           <Route path="Technical_Support" element={<TechnicalSupport/>}></Route>
           <Route path="About" element={<About/>}></Route>
           <Route path="*" element={<Error />}></Route>
         </Routes>
      </Router>
      </global.Provider>
    </>
  );
}

export default App;
