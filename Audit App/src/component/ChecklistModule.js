import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderNav from "./HeaderNav";
import UnauthorizedAccess from "./UnauthorizedAccess";


export default function ChecklistModule() {
    const[name,setName]=useState("Internal");
    const[myData,setMyData]=useState([]);
    useEffect( () => {
      // alert("Hi");
      async function getData() {
        const res = await axios.get
        (`https://localhost:6001/api/AuditChecklist/${name}`);
            console.log(res.data);
            setMyData(res.data);          
        }
          getData();
      },[name]);
    const inputEvent = (event) => {
        // console.log(event.target.value);
        setName(event.target.value);
      }   
    return localStorage.getItem("token") ? (
      <>
          <HeaderNav />
          <div className="col-lg-6 offset-lg-3 ">
            <h1>You choosed {name} Audit type</h1>
            <div className="mb-4 ">
            <select
              value={name}
              onChange={inputEvent}
              >
                <option value={"Internal"}>Internal</option>
                <option value={"SOX"}>SOX</option>
            </select>
              <h1>Questions</h1>
              {myData.map((item)=>{
                const{id,questionNo,question}=item;
                return (<div key={id}>
                  <h4>{questionNo}. {question}</h4>
                </div>)
              })}
              </div>
            </div>
        </>)
       : (
        <UnauthorizedAccess />
      );
}
