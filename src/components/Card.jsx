// This file contains code to display store.

import {Link} from 'react-router-dom';

function Card({data}) {
    const card_style = {
        textAlign: "center",
        backgroundImage: "linear-gradient(to bottom right, pink, skyblue)",
        width: "20%",
        margin: "1%",
        padding: "1%",
        borderRadius: "15px",
        boxShadow: "0px 0px 50px skyblue"
    }
    return (
      <div style={card_style}>
        <Link to={`store/${data.store_id}`} className="text-dark" style={{textDecoration: "none"}}>
        <img
        src={data.store_image ? data.store_image : "https://png.pngtree.com/element_our/20190603/ourlarge/pngtree-shop-store-cartoon-illustration-image_1433180.jpg"}
        alt={data.store_image}
        style={{borderRadius: "15px"}}
        width="100%"
        height="50%"
        />
        <hr />
        <h4>{data.store_name}</h4>
        <strong>{data.hall_price ? "$" + data.hall_price : ""}</strong>
        <p>{data.store_timing}</p>
        <p>{data.store_location}</p>
        </Link>
      </div>
    );
  }
  
  export default Card;