import "./geo-popup.style.css";
import { ReactComponent as Warning } from "../../icons/Warning.svg"
import { useEffect } from "react";

const CancellationPopup = ({ handleCancel, getTeamsFollow, userLocation }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        // const isLocationSet = localStorage.getItem("isLocationSet")
        // if(isLocationSet){
        //     if(JSON.parse(isLocationSet)){
        //         handleConfirm()
        //     }else{
        //         handleCancel(false)
        //     }
        // }
        return () => document.body.style.overflow = 'unset';
    }, []);

    const handleBackgroundClick = e => {
        if (e.target.classList.contains("black-background")) {
            handleCancel(false)
        }
    }

    const handleConfirm = async () => {
        handleCancel(false);
        console.log(userLocation, "location form above");
        await getTeamsFollow(userLocation)
    }

    return (
        <div className={"blured-background"} onClick={handleBackgroundClick}>

            <div className={"auxiliary-div"}>
                <div className={"red-circle-warning"}>
                    <Warning className={"icon-warning"} />
                </div>

                <div className={"white-rectangle"}>
                    <div className={"div-text"}>
                        <div>
                            <span className={"span-headline-warning"}>Are you sure you want us to use your geolocation?</span>
                        </div>
                        <div className="span-info">
                            <span className={"span-cancellation-info"}>If you cancel you won't see any articles!</span>
                        </div>
                    </div>

                    <div className={"yes-no-div"}>
                        <div className={"yes-no-buttons"}>
                            <div>
                                <button className={"button-no"} onClick={() => {handleCancel(false)
                                // localStorage.setItem("isLocationSet", false) 
                                }}>
                                    <span className={"span-no"}>Cancel</span>
                                </button>
                            </div>
                            <div>
                                <button className={"button-yes"} onClick={() => {handleConfirm()
                                //   localStorage.setItem("isLocationSet", true)
                                  }}>
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