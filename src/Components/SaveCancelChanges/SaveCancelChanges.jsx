import React from 'react';
import "./save-cancel-changes.style.css";
import {useNavigate} from "react-router-dom";
import CancellationPopup from "../CancellationPopup/CancellationPopup";

const SaveCancelChanges = ({handleSubmit, handleCancel}) => {
    const navigate = useNavigate()
    return (
        <div className={"all-components"}>
            <label className={"left-label"}>NBA</label>
            <div className={"buttons"}>
                <div>
                    <button className={"button-cancel"} onClick={handleCancel}>
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