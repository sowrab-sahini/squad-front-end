import {Redirect, useHistory, useParams} from 'react-router-dom';
import { useState, useEffect } from "react";
import { uploadFile } from 'react-s3';
import axios from 'axios';

const config = {
    bucketName: "squadunt",
    region: "us-east-2",
    accessKeyId: "AKIAYHYBG62CO5574AOX",
    secretAccessKey: "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",
}

function Updatestore({user}) {
    const page_style = {
        margin: "4% 35% 0 35%",
        backgroundImage: "linear-gradient(to bottom right, skyblue, pink)",
        borderRadius: "25px",
        padding: "3% 5% 3% 5%",
        boxShadow: "0px 0px 100px skyblue"
    }
    const [error, setError] = useState((<div></div>));
    const { id } =useParams();
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
    const UpdatestoreSubmit = e => {
        e.preventDefault();
        if(file){ uploadFile(file, config)
            .then(data => {
                axios.post('updatestore', {...formdata, image: data.location , id: id}, {
                    headers: { 'token': user.token }
                  }).then(
                    res => {
                        if(res.status === 200) history.goBack();
                    }
                    ).catch(
                        error => { 
                            setError((<div className="alert alert-danger">
                            {error.response ? error.response.data.message : "Something Went Wrong! Try Later."}
                            </div>)); }
                    )
                }
        ).catch( error => { 
            setError((<div className="alert alert-danger">
            "Unable to upload Image."
            </div>)); })
            }
    else { 
    axios.post('updatestore', {...formdata , id: id}, {
            headers: { 'token': user.token }
          }).then(
            res => {
                if(res.status === 200) history.goBack();
            }
            ).catch(
                error => { 
                    setError((<div className="alert alert-danger">
                    {error.response ? error.response.data.message : "Something Went Wrong! Try Later."}
                    </div>)); }
            )
    }
    };

    const updateData = () => {
        axios.post('getstore', {store_id: id}).then(
          res => {
              if(res.status === 200) setFormdata({
                email: res.data.admin_email,
                name: res.data.store_name,
                price: res.data.hall_price,
                timings: res.data.store_timing,
                type: res.data.is_retail,
                location: res.data.store_location
            });
          }
          ).catch(
              (error) => { console.log(error); }
          )
    };
  
    useEffect(() => {
      updateData();
    }, []);

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
            <form className="text-center" style={page_style} onSubmit={UpdatestoreSubmit}>
                <h3>Update Store</h3>
                <br/>
                {error}
                <div className="form-group" style={{marginBottom:"10px"}}>
                    <input type="email" className="form-control" placeholder="Store Admin Email" name="email" value={formdata.email} onChange={onInputChange} required/>
                </div>
                <hr />
                <div className="form-group" style={{marginBottom:"10px"}}>
                    <input type="text" className="form-control" placeholder="Store Name" name="name" value={formdata.name} onChange={onInputChange} required/>
                </div>
                <div className="form-group" style={{marginBottom:"10px"}}>
                    <input type="number" step="0.01" className="form-control" placeholder="Store Entry Price" name="price" value={formdata.price} onChange={onInputChange} required/>
                </div>
                <div className="form-group" style={{marginBottom:"10px"}}>
                    <label>Upload New Store Image</label>
                    <input type="file" className="form-control" name="image" onChange={handleImage}/>
                </div>
                <div className="form-group" style={{marginBottom:"10px"}}>
                    <textarea className="form-control" rows="2" placeholder="Store Timings" name="timings" value={formdata.timings} onChange={onInputChange} required></textarea>
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
                    <input type="text" className="form-control" placeholder="Store Location" name="location" value={formdata.location} onChange={onInputChange} required/>
                </div>
                <button type="submit" className="btn btn-success btn-block">Update Store</button>
            </form>
        </div>
    );
}
    
export default Updatestore;