import {Link, useHistory, useParams} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from "react";

function Itempage({user}) {
    const title_style = {
        backgroundImage: "linear-gradient(to bottom right, pink, skyblue)",
        margin: "1%",
        padding: "1%",
        borderRadius: "15px",
        boxShadow: "0px 0px 50px skyblue"
      }
    const { id } =useParams();
    const [data, setData] = useState({});
    const item = {
        textAlign: "center",
        backgroundImage: "linear-gradient(to bottom right, pink, skyblue)",
        padding: "5%",
        margin: "5% 10% 0 10%",
        borderRadius: "25px",
        boxShadow: "0px 0px 100px skyblue"
    }
    let update_item;
    let history = useHistory();
    const onDelete = () => {
        axios.post('deleteitem', {item_id: id}, {
            headers: { 'token': user.token }
          }).then(
            res => {
                if(res.status === 200) history.goBack();
            }
            ).catch(
                (error) => { console.log(error); }
            )
        
    }

    const updateData = () => {
        axios.post('getitem', {item_id: id}).then(
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

    if(user && !user.is_super_admin && data.store_id === user.store_id){
        update_item = (
            <div className="col-12" style={{marginTop: "3%"}}>
                <div className="row">
                <div className="col-6">
                <Link to={`/update-item/${id}`}>
                    <button className="btn btn-success" type="button">Update Item</button>
                </Link>
                </div>
                <div className="col-6">
                    <button className="btn btn-danger" type="button" onClick={onDelete}>Delete Item</button>
                </div>
                </div> 
            </div>
        )
      }
    return ( 
        <div>
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
            <div className="col-2" style={{textAlign: "left"}}></div>
            </div>
        <div className="row" style={item}>
            <div className="col-6">
            <img
            src={data.item_image ? data.item_image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVzVekznLhvE___KitgzkrFVBa1UHjGhKMwvPexLDHDFMTAH934qkxMVQLBI-aMe1vJV0&usqp=CAU"}
            alt={data.item_image}
            style={{borderRadius: "25px"}}
            width="100%"
            height="auto"
            />
            </div>
            <div className="col-6">
                <h2 className="text-center">{data.item_name}</h2>
                <div style={{alignment: "right"}}><button type="text" class={data.item_availability ? "btn btn-success btn-sm" : "btn btn-danger btn-sm"} style={{borderRadius: "50px", fontSize:"10px"}}>{data.item_availability ? "available" : "unavailable"}</button></div>
                <br />
                <strong>{data.item_price ? "$" + data.item_price : ""}</strong><br />
                <strong>{data.item_calories} Cals</strong>
                <p>{data.item_ingredients}</p>
                <p>{data.available_at}</p>
                <p><strong>Item Description: </strong>
                {data.item_description}</p>
            </div>
            {update_item}
        </div>
        </div>
    );
}
    
export default Itempage;