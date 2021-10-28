import {Link, Redirect, useHistory} from 'react-router-dom';
import { useState } from "react";
import axios from 'axios';

function Login({user, setUser}) {
    const page_style = {
        margin: "10% 35% 0 35%",
        backgroundImage: "linear-gradient(to bottom right, skyblue, pink)",
        borderRadius: "25px",
        padding: "4%",
        boxShadow: "0px 0px 100px skyblue"
    }
    const [error, setError] = useState((<div></div>));
    const [creds, setCreds] = useState({
        email: '',
        password: ''
    });
    let history = useHistory();
    const LoginSubmit = e => {
        e.preventDefault();
        axios.post('login', creds).then(
            res => {
                    localStorage.setItem('user', JSON.stringify(res.data));
                    setUser(res.data);
                    history.goBack();
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
        setCreds({
          ...creds,
          [name]: value
        });
      };

    if(user){
        return <Redirect to={'/'} />;
    }

    return ( 
        <div>
            <form className="text-center" style={page_style} onSubmit={LoginSubmit}>
                <h3>Log In</h3>
                <br/>
                {error}
                <div className="form-group" style={{marginBottom:"10px"}}>
                    <input type="email" className="form-control" placeholder="Enter Email" name="email" onChange={onInputChange} required/>
                </div>
                <div className="form-group" style={{marginBottom:"15px"}}>
                    <input type="password" className="form-control" placeholder="Enter Password" name="password" onChange={onInputChange} required/>
                </div>
                <button type="submit" className="btn btn-success btn-block">Log In</button>
                <p className="forgot-password" style={{marginTop:"5px"}}>
                    <Link to="/forgot-password">Forgot password?</Link>
                </p>
            </form>
        </div>
    );
}
    
export default Login;