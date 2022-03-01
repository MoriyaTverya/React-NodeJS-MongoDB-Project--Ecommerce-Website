import React, { useState, useEffect } from "react";
import axios from "axios";
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';


export default function Content() {

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
        <div className="auth-wrapper" >
            <div className="auth-inner">
                <form onSubmit={handleSubmit} dir="rtl">

                    <h1> הוספת קטגוריה </h1>

                    <div className="form-group">
                        <label>שם קטגוריה</label>
                        <input onChange={handleChange1}
                            name="category"
                            value={input.category}
                            type="text"
                            className="form-control"
                            placeholder="Enter category"
                        />
                    </div>

                    <div className="form-group">
                        <label>קטגורית אב</label>
                        {/* <input onChange={handleChange1}
                            name="masterCategory"
                            value={input.masterCategory}
                            type="text"
                            className="form-control"
                            placeholder="Enter masterCategory"

                        /> */}
                        {
                            list.map(item => <div>
                                <input type="Radio" value={item.categoryName} name="masterCategory1" onChange={handleChange} />
                                {item.categoryName}
                            </div>)
                        }
                        <button
                            type="reset"
                            onClick={resetRadioState}
                        >נקה בחירה </button>
                    </div>




                    <button type="submit" className="btn btn-primary btn-block" disabled={!validateForm()}>הוסף</button>

                </form>
            </div>
        </div>


    )
}