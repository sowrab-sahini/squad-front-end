import "./Hall.css";
import Item from "./Item";
import {Link, useParams, useHistory} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from "react";

function Store({user}) {
  const title_style = {
    backgroundImage: "linear-gradient(to bottom right, pink, skyblue)",
    margin: "1%",
    padding: "1%",
    borderRadius: "15px",
    boxShadow: "0px 0px 50px skyblue"
  }
  const { id } =useParams();
  let history = useHistory();
  let add_item;
  const onDelete = () => {
    axios.post('deletestore', {store_id: id}, {
        headers: { 'token': user.token }
      }).then(
        res => {
            if(res.status === 200) history.goBack();
        }
        ).catch(
            (error) => { console.log(error); }
        )
    
  }
  if(user && !user.is_super_admin && parseInt(id) === user.store_id){
    add_item = (
      <div style={{marginTop: "10%"}}>
        <Link to="/add-item">
            <button className="btn btn-success" type="button">Add Item</button>
        </Link>
      </div>
    )
  } else if(user && user.is_super_admin){
    add_item = (
      <div style={{marginTop: "5%"}}>
        <Link to={`/update-store/${id}`}>
            <button className="btn btn-success" type="button">Update store</button>
        </Link>
        <button className="btn btn-danger" style={{marginTop: "5%"}} type="button" onClick={onDelete}>Delete store</button>
      </div>
    )
  } else {
    add_item = ( <br /> )
  }

  const [data, setData] = useState({items: []});
  const updateData = () => {
      axios.post('getitems', {store_id: id}).then(
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
        <div className="row" style={title_style}>
            <div className="col-3"></div>
            <div className="col-1">
            <img
            src={data.store ? data.store.store_image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVzVekznLhvE___KitgzkrFVBa1UHjGhKMwvPexLDHDFMTAH934qkxMVQLBI-aMe1vJV0&usqp=CAU"}
            alt={data.item_image}
            style={{borderRadius: "15px"}}
            width="100%"
            height="auto"
            />
            </div>
            <div className="col-6" style={{textAlign: "left"}}>
                <h2>{data.store ? data.store.store_name : "Loading..." }</h2>
                <p><strong>{data.store ? data.store.hall_price ? "$" + data.store.hall_price + "  |  " : "" : ""}</strong>
                {data.store ? data.store.store_timing : ""}<br />
                {data.store ? data.store.store_location : ""}</p>
            </div>
            <div className="col-2" style={{textAlign: "left"}}>{add_item}</div>
        </div>
        <h1><u>MENU</u></h1>
        <div className="cards">
        {data.items.map((entry) => (
          <Item data={entry} />
        ))}
        </div>
    </div>
  );
}

export default Store;
