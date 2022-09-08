import "./profile.style.css";
import Header from "../../Components/Header";
import NavBar from "../../Components/NavBar";
import UpdateUserInfo from "../../Components/UpdateUserInfo/UpdateUserInfo";
import ChangePassword from "../../Components/ChangePassword/ChangePassword";

const Profile = () => {
    return (
        <div className={"update-user-information"}>
            <Header/>

            <div className={"update-user__wrapper"}>
                <div className={"nav-bar-user"}>
                    <NavBar/>
                </div>

                <div className={"user-panel"}>
                    <div>
                        <button className={"panel-button"}>
                            <span className={"span-button"}>Personal</span>
                        </button>
                    </div>
                    <div>
                        <button className={"panel-button"}>
                            <span className={"span-button"}>Change password</span>
                        </button>
                    </div>
                    <div>
                        <button className={"panel-button"}>
                            <span className={"span-button"}>My surveys</span>
                        </button>
                    </div>
                    <div>
                        <button className={"panel-button"}>
                            <span className={"span-button"}>Team hub</span>
                        </button>
                    </div>
                </div>

                <UpdateUserInfo/>
                {/*<ChangePassword/>*/}
            </div>
        </div>
    );
}

export default Profile;