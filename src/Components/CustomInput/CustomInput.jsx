import "./custom-input.style.css";

const CustomInput = ({handleChange, label, ...otherProps}) => {
    return (
        <div className="custom-input">
            <label className="form-label" htmlFor="input">{label}</label>
            <br/>
            <input className="form-input" id="input" onChange={handleChange} {...otherProps}/>
        </div>
    );
}

export default CustomInput;