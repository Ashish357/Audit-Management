import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderNav from "./HeaderNav";
import UnauthorizedAccess from "./UnauthorizedAccess";

export default function BenchmarkModule() {
    const[myData,setMyData]=useState([]);
      useEffect( () => {
        // alert("Hi");
        async function getData() {
          const res = await axios.get
          (`https://localhost:4001/api/AuditBenchmark`);
              console.log(res.data);
              setMyData(res.data);          
          }
            getData();
        },[]);
      
    return localStorage.getItem("token") ? (
        <>
          <HeaderNav />
          <div className="col-lg-6 offset-lg-3 ">
            <h1 className="mb-lg-5">Audit Benchmark Module</h1>
            <div className="mb-4 ">
              {myData.map((item=>{
                const{auditType,benchmarkNoAnswers}=item;
                return(<div key={auditType}>
                  <h4>Audit Type: {auditType} and Benchmark Answers: {benchmarkNoAnswers}</h4>
                  </div>)
              }))}
              </div>
            </div>
        </>
      ) : (
        <UnauthorizedAccess />
      );
}
