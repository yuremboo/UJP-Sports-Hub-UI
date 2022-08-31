import "./custom-textarea.style.css"

const CustomTextarea = ({handleChange, label, ...otherProps}) => {
    return (
        <div className="custom-textarea">
            <label className="form-label" htmlFor="content">{label}</label>
            <br/>
            <textarea className="form-textarea" name="content" id="content" onChange={handleChange} {...otherProps}></textarea>
        </div>
    );
}

export default CustomTextarea;