import "./custom-select.style.css";

const CustomSelect = ({ handleChange, enumeration, get, label, ...otherProps }) => {

  return (
    <div className="custom-select">
      <label className="form-label" htmlFor="select">{label}</label>
      <br />
      {
          (() => {
            switch(get) {

              case("name"): {
                return (
                  <select className="form-select" name="select" id="select" onChange={handleChange} {...otherProps}>
                    {
                      enumeration.map(enumerate =>
                        <option value={enumerate.name}>{enumerate.name}</option>)
                    }
                  </select>
                )
              }
                break;

              case("title"): {
                return (
                  <select className="form-select" name="select" id="select" onChange={handleChange} {...otherProps}>
                    {
                      enumeration.map(enumerate =>
                        <option value={enumerate.name}>{enumerate.title}</option>)
                    }
                  </select>
                )
              }
                break;

              default: {
                return (
                  <select className="form-select" name="select" id="select" onChange={handleChange} {...otherProps}>
                    {
                      enumeration.map(enumerate =>
                        <option value={enumerate.name}>{enumerate.name}</option>)
                    }
                  </select>
                )
              }
                break;
            }
          })()
      }
    </div>
  );
};

export default CustomSelect;