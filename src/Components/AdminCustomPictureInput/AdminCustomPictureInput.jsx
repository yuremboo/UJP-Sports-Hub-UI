import "./admin-custom-picture-input.style.css";
import { ReactComponent as Photo } from "../../icons/photoEditor/Photo.svg";
import CustomInput from "../CustomInput/CustomInput";
import { useState } from "react";
import { ReactComponent as Trash } from "../../icons/photoEditor/Trash.svg";
import { ReactComponent as Scale } from "../../icons/photoEditor/Scale.svg";
import { ReactComponent as Fullscreen } from "../../icons/photoEditor/Fullscreen.svg";
import { ReactComponent as Filter } from "../../icons/photoEditor/Filter.svg";
import { MDBSwitch } from 'mdb-react-ui-kit';
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { addPhotoOfTheDaySection, addPhotoOfTheDay } from "../../redux/admin-photo-of-the-day/admin-photo.action";

const initialValues = {
    alt: "",
    photoTitle: "",
    shortDescription: "",
    author: "",
    isHidden: false
}


const AdminCustomPictureInput = ({ image, setImage, values, setValues, errors, setErrors }) => {

    const [imageURL, setImageURL] = useState([]);

    useEffect(() => {
        if (image.length < 1) { 
            setImageURL([])
            return
         }
        setImageURL((window.URL || window.webkitURL).createObjectURL(image[0]))

    }, [image])

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: '' })
    }

    const handleImageChange = (e) => {
        setImage([...e.target.files])
        setErrors({ ...errors, image: '' })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    }


    return (
        <div className='admin-photo-of-the-day'>
            <div className='breakdown-header admin-breakdown-header'>
                <hr />
                <div className='breakdown-header__text'>
                    <p>PHOTO OF THE DAY</p>
                </div>
            </div>
            <form className="admin-photo-of-the-day" onSubmit={handleSubmit}>
            {errors.image && <p className='photo__error'>
                    {errors.image}
                </p>}
                <label className="admin-form-label" htmlFor="pictureInput">{"PICTURE*"}</label>
                <label className="photo-wrapper">
                    <div className={"admin-form-picture"}>
                        <div className="background-photo" style={{ backgroundImage: `url(${imageURL})` }} />
                        <div>
                            <div className={`admin-red-circle center-icon ${imageURL.length ? "disable-span" : ""}`}>
                                <Photo className={"admin-icon-photo"} />
                            </div>

                            <div className={`admin-center-span ${imageURL.length ? "disable-span" : ""}`} >
                                <div className={"admin-span-under-photo-icon"}>
                                    <span className={"admin-span-add-picture"}>+Add picture</span> or drop it right here
                                    <br /> You can add next formats: png. jpg. jpeg. tif
                                </div>
                            </div>
                        </div>
                        <div className={`icon-wrapper ${!imageURL.length ? "disable-icons" : ""}`}>
                            <div className={"red-icon"}>
                                <Filter className={"form-icons icon-filter"} />
                            </div>
                            <div className={"red-icon"}>
                                <Scale className={"form-icons icon-scale"} />
                            </div>
                            <div className={"red-icon"}>
                                <Trash className={"form-icons icon-trash"} />
                            </div>
                            <div className={"red-icon"}>
                                <Fullscreen className={"form-icons icon-fullscreen"} />
                            </div>
                        </div>
                    </div>
                    <input type={"file"} accept="image/*" onChange={handleImageChange} />
                </label>

                {errors.alt && <p className='photo__error'>
                    {errors.alt}
                </p>}
                <CustomInput
                    type="text"
                    label={"ALT."}
                    name={"alt"}
                    value={values.alt}
                    handleChange={handleChange}
                />
                {errors.photoTitle && <p className='photo__error'>
                    {errors.photoTitle}
                </p>}
                <CustomInput
                    type="text"
                    label={"PHOTO TITLE*"}
                    name={"photoTitle"}
                    value={values.photoTitle}
                    handleChange={handleChange}
                    />
                  {errors.shortDescription && <p className='photo__error'>
                    {errors.shortDescription}
                </p>}
                <CustomInput
                    type="text"
                    label={"SHORT DESCRIPTION*"}
                    name={"shortDescription"}
                    value={values.shortDescription}
                    handleChange={handleChange}
                />
                  {errors.author && <p className='photo__error'>
                    {errors.author}
                </p>}
                <CustomInput
                    type="text"
                    label={"AUTHOR*"}
                    name={"author"}
                    value={values.author}
                    handleChange={handleChange}
                />
                <div className="admin-photo-switch">
                    <span className={"span-photo"}>Show on the main page</span>
                     <MDBSwitch id='show-hide-toggle'
                                   className={"show-hide-toggle"}
                                   checked={values.isHidden}
                                   onChange={() => {
                                       setValues({...values, isHidden: !values.isHidden})
                                   }}/>
                </div>
            </form>
        </div>
    );
}

export default AdminCustomPictureInput;