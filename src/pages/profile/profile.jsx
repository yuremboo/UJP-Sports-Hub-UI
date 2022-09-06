import "./profile.style.css";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import UpdateUserInfo from "../../components/UpdateUserInfo/UpdateUserInfo";
import ChangePassword from "../../components/ChangePassword/ChangePassword";

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

                {/*<UpdateUserInfo/>*/}
                {/*<ChangePassword/>*/}
            </div>
        </div>
    );
}

export default Profile;