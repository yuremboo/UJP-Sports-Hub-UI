import React from 'react';
import "./custom-input.style.css";

const CustomInput = ({handleChange, label, value, ...otherProps}) => {
    return (
        <div className="custom-input">
            <label className="form-label" htmlFor="input">{label}</label>
            <br/>
            <input className="form-input" id="input" value={value} onChange={handleChange} {...otherProps}/>
        </div>
    );
}

export default CustomInput;