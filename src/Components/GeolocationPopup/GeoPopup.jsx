import "./cancellation-popup.style.css";
import {useNavigate} from "react-router-dom";
import {ReactComponent as Warning} from "../../icons/Warning.svg"
import {useEffect} from "react";

const CancellationPopup = ({handleCancel}) => {
    const navigate = useNavigate()
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'unset';
    }, []);

    const handleBackgroundClick = e => {
        if (e.target.classList.contains("black-background")) {
            handleCancel()
        }
    }

    return (
        <div className={"black-background"} onClick={handleBackgroundClick}>

            <div className={"auxiliary-div"}>
                <div className={"red-circle-warning"}>
                    <Warning className={"icon-warning"}/>
                </div>

                <div className={"white-rectangle"}>
                    <div className={"div-text"}>
                        <div>
                            <span className={"span-headline-warning"}>Are you sure you want us to use your geolocation?</span>
                        </div>
                        <div>
                            <span className={"span-cancellation-info"}>If you cancel you won't see any articles!</span>
                        </div>
                    </div>

                    <div className={"yes-no-div"}>
                        <div className={"yes-no-buttons"}>
                            <div>
                                <button className={"button-no"} onClick={handleCancel}>
                                    <span className={"span-no"}>Cancel</span>
                                </button>
                            </div>
                            <div>
                                <button className={"button-yes"} onClick={() => navigate("/")}>
                                    <span className={"span-yes"}>Yes</span>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default CancellationPopup;