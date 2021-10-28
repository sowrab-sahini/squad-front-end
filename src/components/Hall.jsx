// This file contains code to halls page.

import "./Hall.css";
import Card from "./Card";
import React, { useState, useEffect } from "react";
import axios from 'axios';

function Hall({title}) {
  const [data, setData] = useState([]);
  const updateData = () => {
      axios.post('getstores', {is_retail: title === "Retail Stores" ? true : false}).then(
        res => {
            if(res.status === 200) setData(res.data);
        }
        ).catch(
            (error) => { console.log(error); }
        )
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <div className="text-center">
        <br />
        <h1>{title}</h1>
        <br />
        <div className="cards">
        {data.map((entry) => (
          <Card data={entry} />
        ))}
        </div>
    </div>
  );
}

export default Hall;
