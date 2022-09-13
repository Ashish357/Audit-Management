import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderNav from "./HeaderNav";
import UnauthorizedAccess from "./UnauthorizedAccess";


export default function Stocks() {
  const [name, setName] = useState("");
  const [shareName, setShareName] = useState();
  const [nam, setNam] = useState("");
  const [val, setVal] = useState("");
  useEffect(() => {
    // alert("Hi");
    async function getData() {
      const res = await axios.get(
        `https://localhost:4001/api/stockprice/${shareName}`
      );
      // console.log(res.data.stockName);
      setNam(res.data.stockName);
      setVal(res.data.stockPrice);
    }
    getData();
  });
  const inputEvent = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };
  const onSubmits = (event) => {
    event.preventDefault(); //to prevent refresh the page
    setShareName(name);
  };
  return localStorage.getItem("token") ? (
    <>
      <HeaderNav />
      <div className="col-lg-6 offset-lg-3 ">
        <h1 className="mb-lg-5">Search Stocks </h1>
        <div className="mb-4 ">
          <form
            className="form-inline mr-auto mb-4 d-flex justify-content-center"
            onSubmit={onSubmits}
          >
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search"
              aria-label="Search"
              onChange={inputEvent}
              value={name}
            />
            <button
              className="btn btn-indigo btn-rounded btn-md my-0 waves-effect waves-light"
              type="submit"
            >
              Search
            </button>
          </form>

          
        </div>
        <div>
          <h1>Name: {nam}</h1>
          <h1>Value: {val}</h1>
        </div>
      </div>
    </>
  ) : (
    <UnauthorizedAccess />
  );
}
