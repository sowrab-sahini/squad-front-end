import {Redirect, useHistory, useParams} from 'react-router-dom';
import axios from 'axios';
import { uploadFile } from 'react-s3';
import { useState, useEffect } from "react";

const config = {
    bucketName: "squadunt",
    region: "us-east-2",
    accessKeyId: "AKIAYHYBG62CO5574AOX",
    secretAccessKey: "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",
}

function Updateitem({user}) {
    const page_style = {
        margin: "3% 35% 0 35%",
        backgroundImage: "linear-gradient(to bottom right, skyblue, pink)",
        borderRadius: "25px",
        padding: "3% 5% 3% 5%",
        boxShadow: "0px 0px 100px skyblue"
    }
    const { id } =useParams();
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
    const UpdateitemSubmit = e => {
    e.preventDefault();
    if(file){ uploadFile(file, config)
            .then(data => {
                axios.post('updateitem', {...formdata, image: data.location , id: id}, {
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
            }
    else { 
    axios.post('updateitem', {...formdata , id: id}, {
            headers: { 'token': user.token }
          }).then(
            res => {
                if(res.status === 200) history.goBack();
            }
            ).catch(
                err => { console.log(err); }
            )
    }
    };

    const updateData = () => {
        axios.post('getitem', {item_id: id}).then(
          res => {
              if(res.status === 200) setFormdata({
                name: res.data.item_name,
                price: res.data.item_price,
                calories: res.data.item_calories,
                ingredients: res.data.item_ingredients,
                type: res.data.item_availability,
                location: res.data.available_at,
                description: res.data.item_description
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
    
    if(!user){
        return <Redirect to={'/login'} />;
    }

    if(user && user.is_super_admin){
        return <Redirect to={'/'} />;
    }

    return ( 
        <div>
            <form className="text-center" style={page_style} onSubmit={UpdateitemSubmit}>
                <h3>Update Item in Menu</h3>
                <br/>
                <div className="form-group" style={{marginBottom:"10px"}}>
                    <input type="text" className="form-control" placeholder="Item Name" name="name" value={formdata.name} onChange={onInputChange} required/>
                </div>
                <div className="form-group" style={{marginBottom:"10px"}}>
                    <input type="number" step="0.01" className="form-control" placeholder="Item Price" name="price" value={formdata.price} onChange={onInputChange} required/>
                </div>
                <div className="form-group" style={{marginBottom:"10px"}}>
                    <input type="number" className="form-control" placeholder="Item Calories" name="calories" value={formdata.calories} onChange={onInputChange} required/>
                </div>
                <div className="form-group" style={{marginBottom:"10px"}}>
                    <label>Upload New Item Image</label>
                    <input type="file" className="form-control" name="image" onChange={handleImage}/>
                </div>
                <div className="form-group" style={{marginBottom:"10px"}}>
                    <textarea className="form-control" rows="2" placeholder="Item Ingredients" name="ingredients" value={formdata.ingredients} onChange={onInputChange} required></textarea>
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
                    <input type="text" className="form-control" placeholder="Item Location" name="location" value={formdata.location} onChange={onInputChange}/>
                </div>
                <div className="form-group" style={{marginBottom:"15px"}}>
                    <textarea className="form-control" rows="3" placeholder="Item Description" name="description" value={formdata.description} onChange={onInputChange}></textarea>
                </div>
                <button type="submit" className="btn btn-success btn-block">Update Item</button>
            </form>
        </div>
    );
}
    
export default Updateitem;