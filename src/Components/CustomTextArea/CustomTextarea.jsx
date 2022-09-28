import React from 'react';
import "./custom-textarea.style.css"

const CustomTextarea = ({handleChange, label, ...otherProps}) => {
    return (
        <div className="custom-textarea">
            <label className="form-label" htmlFor="text">{label}</label>
            <br/>
            <textarea className="form-textarea" name="text" id="text" onChange={handleChange} {...otherProps}></textarea>
        </div>
    );
}

export default CustomTextarea;