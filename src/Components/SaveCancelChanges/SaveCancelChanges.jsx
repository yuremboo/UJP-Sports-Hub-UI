import React from 'react';
import "./save-cancel-changes.style.css";
import { useNavigate } from "react-router-dom";
import CancellationPopup from "../CancellationPopup/CancellationPopup";

const SaveCancelChanges = ({ handleSubmit, handleCancel, title, saveProp }) => {
    const navigate = useNavigate()
    return (
        <div className={"bottom-header"}>
            <h2 className={"bottom-header__tittle"}>{title}</h2>
            <div className={"bottom-header__buttons"}>
                <button className={"buttons__cancel"} onClick={handleCancel}>
                    Cancel
                </button>
                <button className={"buttons__save"} onClick={handleSubmit}>
                    {saveProp}
                </button>
            </div>
        </div>
    );
}

export default SaveCancelChanges;