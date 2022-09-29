import "./custom-picture-input.style.css";
import React from 'react';
import {ReactComponent as Photo} from "../../icons/photoEditor/Photo.svg";
import {ReactComponent as Trash} from "../../icons/photoEditor/Trash.svg";
import {ReactComponent as Scale} from "../../icons/photoEditor/Scale.svg";
import {ReactComponent as Fullscreen} from "../../icons/photoEditor/Fullscreen.svg";
import {ReactComponent as Filter} from "../../icons/photoEditor/Filter.svg";
import Basketball from "../../icons/Basketball.jpg";
import {useEffect, useState} from "react";

const CustomPictureInput = ({label, photo, image, setImage, errors, setErrors, picture, addPhoto, ...otherProps}) => {

    const [imageURL, setImageURL] = useState([]);

    useEffect(() => {
        if (image.length < 1) {
            setImageURL([])
            return
        }
        setImageURL((window.URL || window.webkitURL).createObjectURL(image[0]))

    }, [image])

    const handleImageChange = (e) => {
        setErrors({ ...errors, picture: '' })
        setImage([...e.target.files])
    }

    return (
        <div className={(addPhoto && imageURL.length === 0) ? "test__" : ""}>
            {errors.picture && <p className='photo__error'>
                {errors.picture}
            </p>}
            <label className="form-label" htmlFor="pictureInput">{label}</label>
            <label className="photo-wrapper">
                <div className={"form-picture"}
                     style={!photo ? {background: "#C4C4C414", border: "1px dashed #D1D1D1"} : {}}>
                    {(photo || (addPhoto && imageURL.length !== 0)) && <div className="background-photo"
                                   style={{ backgroundImage: `url(${imageURL.length === 0 ? ("https://ujp-sports-hub.herokuapp.com/api/v1/image/" + picture) : imageURL})`}} />}
                    <div>
                        <label className={`red-circle center-icon ${imageURL.length ? "disable-span" : ""}`} style={!(photo || (addPhoto && imageURL.length !== 0)) ? {opacity: "1"} : {}}>
                            <Photo className={"icon-photo"}/>
                        </label>

                        <div className={`center-span ${imageURL.length ? "disable-span" : ""}`}
                             style={!(photo || (addPhoto && imageURL.length !== 0)) ? {opacity: "1"} : {}}>
                            <div className={"span-under-photo-icon"}

                                 style={!(photo || (addPhoto && imageURL.length !== 0)) ? {color: "#D72130", fontWeight: "600"} : {}}>
                                <span className={"span-add-picture"}>+Add picture</span> or drop it right here
                                <br/> You can add next formats: png. jpg. jpeg. tif
                            </div>
                        </div>
                    </div>
                </div>
                <input type={"file"} accept="image/*" onChange={handleImageChange}/>
            </label>
        </div>
    );
}

export default CustomPictureInput;