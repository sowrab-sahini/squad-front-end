// This file contains code to get store page.

import {Redirect, useHistory} from 'react-router-dom';
import { useState } from "react";
import { uploadFile } from 'react-s3';
import axios from 'axios';

const config = {
    bucketName: "squadunt",
    region: "us-east-2",
    accessKeyId: "AKIAYHYBG62CO5574AOX",
    secretAccessKey: "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",
}

function Addstore({user}) {
    const page_style = {
        margin: "4% 35% 0 35%",
        backgroundImage: "linear-gradient(to bottom right, skyblue, pink)",
        borderRadius: "25px",
        padding: "3% 5% 3% 5%",
        boxShadow: "0px 0px 100px skyblue"
    }
    const [error, setError] = useState((<div></div>));
    const [file, setFile] = useState(null);
    const [formdata, setFormdata] = useState({
        email: '',
        name: '',
        price: '',
        timings: '',
        type: '1',
        location: ''
    });
    let history = useHistory();
    const AddstoreSubmit = e => {
        e.preventDefault();
        uploadFile(file, config)
            .then(data => {
                axios.post('addstore', {...formdata, image: data.location}, {
                    headers: { 'token': user.token }
                  }).then(
                    res => {
                        if(res.status === 200){
                            history.goBack();
                        }
                    }
                    ).catch(
                        error => { 
                            setError((<div className="alert alert-danger">
                            {error.response ? error.response.data.message : "Something Went Wrong! Try Later."}
                            </div>)); }
                    )
                })
            .catch( error => { 
                setError((<div className="alert alert-danger">
                "Unable to upload Image."
                </div>)); })
    };

    const handleImage = e => {
        setFile(e.target.files[0]);
    }

    const onInputChange = e => {
        const { name, value } = e.target;
        setFormdata({
          ...formdata,
          [name]: value
        });
      };

    if(user && !user.is_super_admin){
        return <Redirect to={'/'} />;
    }
    
    if(!user){
        return <Redirect to={'/login'} />;
    }

    return ( 
        <div>
            <form className="text-center" style={page_style} onSubmit={AddstoreSubmit}>
                <h3>Add Store</h3>
                <br/>
                {error}
                <div className="form-group" style={{marginBottom:"10px"}}>
                    <input type="email" className="form-control" placeholder="Store Admin Email" name="email" onChange={onInputChange} required/>
                </div>
                <hr />
                <div className="form-group" style={{marginBottom:"10px"}}>
                    <input type="text" className="form-control" placeholder="Store Name" name="name" onChange={onInputChange} required/>
                </div>
                <div className="form-group" style={{marginBottom:"10px"}}>
                    <input type="number" step="0.01" className="form-control" placeholder="Store Entry Price" name="price" onChange={onInputChange} required/>
                </div>
                <div className="form-group" style={{marginBottom:"10px"}}>
                    <label>Upload Store Image</label>
                    <input type="file" className="form-control" name="image" onChange={handleImage} required/>
                </div>
                <div className="form-group" style={{marginBottom:"10px"}}>
                    <textarea className="form-control" rows="2" placeholder="Store Timings" name="timings" onChange={onInputChange} required></textarea>
                </div>
                <div className="form-check-inline">
                    <label className="form-check-label">
                        <input type="radio" className="form-check-input" name="type" value="1" onChange={onInputChange} defaultChecked/>Retail Store
                    </label>
                </div>
                <div className="form-check-inline" style={{marginBottom:"10px"}}>
                    <label className="form-check-label">
                        <input type="radio" className="form-check-input" name="type" value="0" onChange={onInputChange} />Dining Hall
                    </label>
                </div>
                <div className="form-group" style={{marginBottom:"15px"}}>
                    <input type="text" className="form-control" placeholder="Store Location" name="location" onChange={onInputChange} required/>
                </div>
                <button type="submit" className="btn btn-success btn-block">Add Store</button>
            </form>
        </div>
    );
}
    
export default Addstore;