import React, { useState } from 'react';
import './index.css';

const AddPlayer = (props) => {
    const initInputs = {
        firstName: props.firstName || "",
        lastName: props.lastName ||  "",
        type: props.type || "",
        topScore: props.topScore || "",
        team: props.team || ""
    }
    const [inputs, setInputs] = useState(initInputs);

    const handleChange = e => {
        const {name, value} = e.target;
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }))
    }

    const handleSubmit = ((e) => {
        e.preventDefault();
        if (inputs.type === "Yes") {
          inputs.type = true;
        } else {
          inputs.type = false;
        }
        props.submit(inputs, props._id);
        setInputs(initInputs);
      });

    return (
        <form onSubmit={handleSubmit} >
            <input
                type='text'
                name='firstName'
                value={inputs.firstName}
                onChange={handleChange}
                placeholder='First Name'
            />
            <br />
            <input
                type='text'
                name='lastName'
                value={inputs.lastName}
                onChange={handleChange}
                placeholder='Last Name'
            />
            <br />
            <label>Active:</label> 
            <br />
            Yes: <input type="checkbox" name="type" onChange={() => setInputs(prevInputs => {
                return {...prevInputs, type: "Yes"};
            })} value={inputs.type} checked={inputs.type === "Yes" ? true : false} /> 
            No: <input type="checkbox" name="type" onChange={() => setInputs(prevInputs => {
                return {...prevInputs, type: "No"};
            })} value={inputs.type} checked={inputs.type === "No" ? true : false}/> 
            <br />
            <input
                type='number'
                name='topScore'
                value={inputs.topScore}
                onChange={handleChange}
                placeholder='Player Salary'
            />
            <br />
            <input
                type='text'
                name='team'
                value={inputs.team}
                onChange={handleChange}
                placeholder='Team Name'
            />
            <br />
            <button className='submitB'>{props.buttonText}</button>
        </form>
    );
}

export default AddPlayer