// This file contains code to forgot password page.

import {Redirect} from 'react-router-dom';
import { useState } from "react";
import axios from 'axios';

function Forgotpwd({user}) {
    const page_style = {
        margin: "10% 35% 0 35%",
        backgroundImage: "linear-gradient(to bottom right, skyblue, pink)",
        borderRadius: "25px",
        padding: "4%",
        boxShadow: "0px 0px 100px skyblue"
    }
    const [error, setError] = useState((<div></div>));
    const [email, setEmail] = useState('');
    const forgotSubmit = e => {
        e.preventDefault();
        axios.post('forgot-password', {email}).then(
            res => {
                    setError((<div className="alert alert-success">
                    New Password sent to Email Successfully!
                    </div>));
            }
            ).catch(
                error => { 
                setError((<div className="alert alert-danger">
                {error.response ? error.response.data.message : "Something Went Wrong! Try Later."}
                </div>)); }
            )
    };

    const onInputChange = e => {
        setEmail(e.target.value);
      };

    if(user){
        return <Redirect to={'/'} />;
    }

    return ( 
        <div>
            <form className="text-center" style={page_style} onSubmit={forgotSubmit}>
                <h3>Forgot Password</h3>
                <br/>
                {error}
                <div className="form-group" style={{marginBottom:"15px"}}>
                    <input type="email" className="form-control" placeholder="Enter Email" name="email" onChange={onInputChange} required/>
                </div>
                <button type="submit" className="btn btn-success btn-block">Forgot Password</button>
            </form>
        </div>
    );
}
    
export default Forgotpwd;