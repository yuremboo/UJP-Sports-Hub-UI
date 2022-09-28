import "./custom-select.style.css";

const CustomSelect = ({handleChange,enumeration, label, selected, name, placeholder, ...otherProps}) => {
    return (
        <div className="custom-select">
            <label className="form-label" htmlFor="select">{label}</label>
            <br/>
            <select value={selected} className="form-select__" name={name} id="select" onChange={handleChange} {...otherProps}>
                <option className={"option-not-selected"} key={0} value={""} disabled selected hidden>{placeholder}</option>
                {
                enumeration.map(enumerate =>
                  <option key={enumerate.id + 1} value={enumerate.id}>{enumerate.name}</option>)
              }
            </select>
        </div>
    );
}
export default CustomSelect;