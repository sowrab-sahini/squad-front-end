// This file contains code to change password page.

import {Redirect} from 'react-router-dom';
import { useState } from "react";
import axios from 'axios';

function Changepwd({user, setUser}) {
    const page_style = {
        margin: "10% 35% 0 35%",
        backgroundImage: "linear-gradient(to bottom right, skyblue, pink)",
        borderRadius: "25px",
        padding: "4%",
        boxShadow: "0px 0px 100px skyblue"
    }
    const [error, setError] = useState((<div></div>));
    const [password, setPassword] = useState({
        email: user ? user.email : null,
        old: '',
        new: '',
        cnew: ''
    });
    const changepwdSubmit = e => {
        e.preventDefault();
        axios.post('change-password', password).then(
        res => {
                localStorage.clear();
                setUser(null);
        }
        ).catch(
            error => { 
                setError((<div className="alert alert-danger">
                {error.response ? error.response.data.message : "Something Went Wrong! Try Later."}
                </div>)); }
        )
    };

    const onInputChange = e => {
        const { name, value } = e.target;
        setPassword({
          ...password,
          [name]: value
        });
      };
    
    if(!user){
        return <Redirect to={'/login'} />;
    }

    if(user && user.is_super_admin){
        return <Redirect to={'/'} />;
    }

    return ( 
        <div>
            <form className="text-center" style={page_style} onSubmit={changepwdSubmit}>
                <h3>Change Password</h3>
                <br/>
                {error}
                <div className="form-group" style={{marginBottom:"10px"}}>
                    <input type="password" className="form-control" placeholder="Enter Old Password" name="old" onChange={onInputChange} required/>
                </div>
                <div className="form-group" style={{marginBottom:"10px"}}>
                    <input type="password" className="form-control" placeholder="Enter New Password" name="new" onChange={onInputChange} required/>
                </div>
                <div className="form-group" style={{marginBottom:"15px"}}>
                    <input type="password" className="form-control" placeholder="Conform New Password" name="cnew" onChange={onInputChange} required/>
                </div>
                <button type="submit" className="btn btn-success btn-block">Change Password</button>
            </form>
        </div>
    );
}
    
export default Changepwd;