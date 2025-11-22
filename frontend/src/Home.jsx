import React from "react";
import axios from "axios";
import './home.css'
const Home = ({ urls, url, reload, setReload }) => {
  const deleteUrl = async (shortUrl) => {
    const api = axios.delete(`${url}/api/links/${shortUrl}`);
    console.log("url deleted", api);
    setReload(!reload);
  };
  return (
   <>
    <div className="url-list">
      {urls.map((data) => (
        <div className="url-card" key={data._id}>
          <h2>{data.shortUrl && (
            <div>
              <a href={`http://localhost:2000/api/links/${data.shortUrl}`}>
              {data.shortUrl}
              </a>
            </div>
          )
              
            
            
            
            
            }</h2>

          <button
            className="delete-btn"
            onClick={() => deleteUrl(data.shortUrl)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  </>
  );
};

export default Home;
