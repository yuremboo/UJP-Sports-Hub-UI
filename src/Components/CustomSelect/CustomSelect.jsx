import "./custom-select.style.css";

const CustomSelect = ({handleChange, label, ...otherProps}) => {
    return (
        <div className="custom-select">
            <label className="form-label" htmlFor="select">{label}</label>
            <br/>
            <select className="form-select" name="select" id="select" onChange={handleChange} {...otherProps}>
                <option value="first category">first category</option>
                <option value="second category">second category</option>
                <option value="third category">third category</option>
            </select>
        </div>
    );
}

export default CustomSelect;