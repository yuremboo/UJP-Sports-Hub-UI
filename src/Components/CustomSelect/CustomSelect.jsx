import "./custom-select.style.css";

const CustomSelect = ({handleChange,enumeration, label, selected, name, ...otherProps}) => {
  return (
    <div className="custom-select">
      <label className="form-label" htmlFor="select">{label}</label>
      <br/>
      <select value={selected} className="form-select" name={name} id="select" onChange={handleChange} {...otherProps}>
        {
          enumeration.map(enumerate =>
            <option key={enumerate.id} value={enumerate.id}>{enumerate.name}</option>)
        }
      </select>
    </div>
  );
}
export default CustomSelect;