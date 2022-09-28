import "./save-cancel-changes.style.css";
import { useNavigate } from "react-router-dom";
import CancellationPopup from "../CancellationPopup/CancellationPopup";
import AddNewArticleBtn from "../shortArticle/addNewArticleBtn";

const SaveCancelChanges = ({ handleSubmit, handleCancel, title, saveProp, check }) => {
    const navigate = useNavigate()
    return (
        <div className={"bottom-header"}>
            <h2 className={"bottom-header__tittle"}>{title}</h2>
            {
                check === true ?
            <div className={"bottom-header__buttons"}>
                <button className={"buttons__cancel"} onClick={handleCancel}>
                    Cancel
                </button>
                <button className={"buttons__save"} onClick={handleSubmit}>
                    {saveProp}
                </button>
            </div> : <AddNewArticleBtn/>
            }
        </div>
    );
}

export default SaveCancelChanges;