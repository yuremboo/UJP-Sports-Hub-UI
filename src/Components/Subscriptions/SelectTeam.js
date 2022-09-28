//import "./custom-select.style.css";
import AsyncSelect from "react-select/async"
const SelectTeam = ({handleChange,loadOptions,enumeration,  label, selected, name, ...otherProps}) => {
    console.log("enumeration",enumeration)
  return (
    <div className="custom-select">
      <label className="form-label" htmlFor="select">{label}</label>
      <br/>

      <AsyncSelect loadOptions={loadOptions}
                   value={selected} className="form-select" name={name} id="select" onChange={handleChange} {...otherProps}>
          {
              enumeration.map(enumerate =>
                  <option key={enumerate.id} name={"enumerate"} value={enumerate.name}>{enumerate.name}</option>)
          }
      </AsyncSelect>
    </div>
  );
}
export default SelectTeam;