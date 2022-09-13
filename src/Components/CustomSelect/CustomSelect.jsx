import "./custom-select.style.css";

const CustomSelect = ({handleChange,enumeration,get, label, ...otherProps}) => {

    return (
        <div className="custom-select">
            <label className="form-label" htmlFor="select">{label}</label>
            <br/>
            <select className="form-select" name="select" id="select" onChange={handleChange} {...otherProps}>
              {
                enumeration.map(enumerate =>
                  <option value={enumerate.name}>{enumerate+get}</option>)
              }
            </select>
        </div>
    );
}

export default CustomSelect;