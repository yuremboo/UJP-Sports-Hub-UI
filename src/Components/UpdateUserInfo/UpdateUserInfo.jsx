import "./update-user-info.style.css";
import EllipseAvatar from "../../icons/EllipseAvatar.jpg";
import { ReactComponent as Photo } from "../../icons/photoEditor/Photo.svg";
import CustomInput from "../CustomInput/CustomInput";
import { useEffect, useState } from "react";
import axios from "axios";

const UpdateUserInfo = () => {
  const [user, setUser] = useState(
    {
      email: "email",
      firstName: "first name",
      lastName: "last name",
      photo: "photo"
    });

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/user/1").then(userData => (
      setUser({
        ...user,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        photo: userData.photo
      })
    ));
  }, []);

  const handleChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div>
      <form className={"update-profile-form"}>
        <div className={"form-photo__container"}>
          <div className={"form-photo"}>
            <img className={"ellipse-avatar-img"} src={EllipseAvatar} alt="EllipseAvatar" />
            <label className={"red-circle-photo"}>
              <input type="file" />
              <Photo className={"profile-icon-photo"} />
            </label>
          </div>
        </div>

        <div className={"custom-input"}>
          <CustomInput
            type="text"
            label={"First name"}
            name={"firstName"}
            value={user.firstName}
            handleChange={handleChange}
          />
        </div>
        <div className={"custom-input"}>
          <CustomInput
            type="text"
            label={"Last name"}
            name={"lastName"}
            value={user.lastName}
            handleChange={handleChange}
          />
        </div>
        <div className={"custom-input"}>
          <CustomInput
            type="text"
            label={"Email"}
            name={"email"}
            value={user.email}
            handleChange={handleChange}
          />
        </div>

        <button className={"update-profile-button"}>
          Update profile
        </button>
      </form>
    </div>
  );
};

export default UpdateUserInfo;