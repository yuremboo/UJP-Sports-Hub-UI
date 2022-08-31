import "./save-cancel-changes.style.css";
import {useNavigate} from "react-router-dom";

const SaveCancelChanges = ({handleSubmit}) => {
    const navigate = useNavigate()
    return (
        <div className={"all-components"}>
            <div className={"left-label"}>
                <label>NBA</label>
            </div>
            <div className={"buttons"}>
                <div>
                    <button className={"button-cancel"} onClick={() => navigate("/")}>
                        <span className={"span-cancel"}>Cancel</span>
                    </button>
                </div>
                <div>
                    <button className={"button-save"} onClick={handleSubmit}>
                        <span className={"span-save"}>Save</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SaveCancelChanges;