import React from "react";
import axios from "axios";
import './addUrl.css'
import { useState } from "react";
const AddUrl = ({ reload, setReload }) => {
  const [originalUrl, setOriginalUrl] = useState("");
  const url = "http://localhost:2000";
  const submitHandler = async (e) => {
    e.preventDefault();
    //send api
    const api = await axios.post(`${url}/api/links`, {
      originalUrl,
    });
    console.log("long url submited", api);
    setOriginalUrl("");
    setReload(!reload);
  };
  return (
     <>
    <div className="addurl-container">
      <h1>TinyLink </h1>

      <form className="addurl-form" onSubmit={submitHandler}>
        <input
          type="text"
          name="originalUrl"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter your long URL here..."
        />
        <button type="submit">Shorten</button>
      </form>
    </div>
  </>
  );
};

export default AddUrl;
