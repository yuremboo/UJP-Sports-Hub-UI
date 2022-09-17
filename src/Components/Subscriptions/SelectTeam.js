//import "./custom-select.style.css";
import AsyncSelect from "react-select/async"
const SelectTeam = ({handleChange,loadOptions,enumeration, label, ...otherProps}) => {

  return (
    <div className="custom-select">
      <label className="form-label" htmlFor="select">{label}</label>
      <br/>
      <AsyncSelect loadOptions={loadOptions} className="form-select" name="select" id="select" onChange={handleChange} {...otherProps}>
        {/*{*/}
        {/*  enumeration.map(enumerate =>*/}
        {/*    <option value="first category">{enumerate.team.name}</option>)*/}
        {/*}*/}
      </AsyncSelect>
    </div>
  );
}

export default SelectTeam;