import React, { useState, useEffect } from "react";
import axios from "axios";
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';


export default function AddCategory() {

    const [input, setInput] = useState({
        category: '',
    })


    const [list, setList] = useState([]);
    useEffect(async () => //initial  
    {
        let result = await axios.get('http://localhost:3001/category/get');
        console.log(result.data);
        setList(result.data);
    }, []);


    function handleOptionChange(changeEvent) {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    }
    const [masterCategory, setMasterCategory] = React.useState('');

    const handleChange = (event) => {
        console.log(event.target.value);
        setMasterCategory(event.target.value)
    }

    const resetRadioState = () => {
        setMasterCategory('');
    }

    function handleChange1(event) {
        const { name, value } = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }
    function validateForm() {
        return input.category.length > 0;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newManager = {
            categoryName: input.category,
            masterCategory: masterCategory
        }
        console.log(newManager);
        const res = await axios.post('http://localhost:3001/category/create', newManager);
        if (res.data === true) {
            alert("ok");
        }
        if (res.data === false) {
            alert("No");

        }
    }
    return (
        <div className="not-sidebar" >
            <div className="">
                <form onSubmit={handleSubmit} dir="rtl">

                    <h5> הוספת קטגוריה </h5>
                    <div className="row">
                        <div className="col-auto">
                            <div className="form-group">
                                <label>שם קטגוריה</label>
                                <input onChange={handleChange1}
                                    name="category"
                                    value={input.category}
                                    type="text"
                                    className="form-control"
                                    placeholder=""
                                />

                            </div>

                        </div>
                        <div className="col-auto">  
                        <div className="form-group">
                            <label>קטגורית אב</label>

                            {
                                list.map(item => <div>
                                    <input type="Radio" value={item.categoryName} name="masterCategory1" onChange={handleChange} />
                                    {item.categoryName}
                                </div>)
                            }
                            <button className="btn btn-primary btn-block turkiz m-2 "
                                type="reset"
                                onClick={resetRadioState}
                            >נקה בחירה </button>


                            
                        </div>
                        </div>  </div><button type="submit" className="btn btn-primary btn-block m-2" disabled={!validateForm()}>הוסף קטגוריה</button>
                  




                </form>
            </div>
        </div>


    )
}