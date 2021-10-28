import { Link } from "react-router-dom";

function Pagenotfound() {
    const title_style = {
        backgroundImage: "linear-gradient(to bottom right, pink, skyblue)",
        margin: "5%",
        padding: "4%",
        borderRadius: "15px",
        boxShadow: "0px 0px 100px skyblue",
        fontFamily: "Courier New"
      }
    return ( 
        <div className="text-center" style={title_style}>
            <h1 style={{fontSize:"100px"}}>Oooooops!</h1>
            <h1 style={{fontSize:"200px"}}>404</h1>
            <h1>PAGE NOT FOUND!</h1>
            <Link className="stores_style text-dark" to="/">
                <h2>Back To Home</h2>
            </Link>
        </div>
    );
}
    
export default Pagenotfound;