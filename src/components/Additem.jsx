// This file contains code to add item page.

import {Redirect, useHistory} from 'react-router-dom';
import axios from 'axios';
import { uploadFile } from 'react-s3';
import { useState } from "react";

const config = {
    bucketName: "squadunt",
    region: "us-east-2",
    accessKeyId: "AKIAYHYBG62CO5574AOX",
    secretAccessKey: "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",
}

function Additem({user}) {
    const page_style = {
        margin: "3% 35% 0 35%",
        backgroundImage: "linear-gradient(to bottom right, skyblue, pink)",
        borderRadius: "25px",
        padding: "3% 5% 3% 5%",
        boxShadow: "0px 0px 100px skyblue"
    }
    const [file, setFile] = useState(null);
    const [formdata, setFormdata] = useState({
        name: '',
        price: '',
        calories: '',
        ingredients: '',
        type: '1',
        location: '',
        description: ''
    });
    let history = useHistory();
    const AdditemSubmit = e => {
        e.preventDefault();
        uploadFile(file, config)
            .then(data => {
                axios.post('additem', {...formdata, image: data.location}, {
                    headers: { 'token': user.token }
                  }).then(
                    res => {
                        if(res.status === 200) history.goBack();
                    }
                    ).catch(
                        err => { console.log(err); }
                    )
                }
        ).catch( err => console.log(err))
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
    
    if(!user){
        return <Redirect to={'/login'} />;
    }

    if(user && user.is_super_admin){
        return <Redirect to={'/'} />;
    }

    return ( 
        <div>
            <form className="text-center" style={page_style} onSubmit={AdditemSubmit}>
                <h3>Add Item to Menu</h3>
                <br/>
                <div className="form-group" style={{marginBottom:"10px"}}>
                    <input type="text" className="form-control" placeholder="Item Name" name="name" onChange={onInputChange} required/>
                </div>
                <div className="form-group" style={{marginBottom:"10px"}}>
                    <input type="number" step="0.01" className="form-control" placeholder="Item Price" name="price" onChange={onInputChange} required/>
                </div>
                <div className="form-group" style={{marginBottom:"10px"}}>
                    <input type="number" className="form-control" placeholder="Item Calories" name="calories" onChange={onInputChange} required/>
                </div>
                <div className="form-group" style={{marginBottom:"10px"}}>
                    <label>Upload Item Image</label>
                    <input type="file" className="form-control" name="image" onChange={handleImage} required/>
                </div>
                <div className="form-group" style={{marginBottom:"10px"}}>
                    <textarea className="form-control" rows="2" placeholder="Item Ingredients" name="ingredients" onChange={onInputChange} required></textarea>
                </div>
                <div className="form-check-inline">
                    <label className="form-check-label">
                        <input type="radio" className="form-check-input" name="type" value="1" onChange={onInputChange} defaultChecked/>Item Available
                    </label>
                </div>
                <div className="form-check-inline" style={{marginBottom:"10px"}}>
                    <label className="form-check-label">
                        <input type="radio" className="form-check-input" name="type" value="0" onChange={onInputChange} />Item Not Available
                    </label>
                </div>
                <div className="form-group" style={{marginBottom:"10px"}}>
                    <input type="text" className="form-control" placeholder="Item Location" name="location" onChange={onInputChange}/>
                </div>
                <div className="form-group" style={{marginBottom:"15px"}}>
                    <textarea className="form-control" rows="3" placeholder="Item Description" name="description" onChange={onInputChange}></textarea>
                </div>
                <button type="submit" className="btn btn-success btn-block">Add Item</button>
            </form>
        </div>
    );
}
    
export default Additem;