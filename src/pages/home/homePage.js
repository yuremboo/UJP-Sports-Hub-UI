import React from "react";
import {
  useNavigate
} from "react-router-dom";
import {
  userLogoutRequest
} from "../../redux/auth/auth.actions";
import { connect } from "react-redux";
import Header from "../../Components/Header";
import NavBar from "../../Components/NavBar";

const HomePage = ({
                    logOutUser,
                    auth: { isLoading, errorMessage, userObject }
                  }) => {

  let navigate = useNavigate();

  async function logOut() {
    await logOutUser();
    navigate("/login");
  }

  return (
    <div className={"header-information"}>
      <Header />

      <div className={"nav-bar-information"}>
        <div className={"nav-bar"}>
          <NavBar />
        </div>
        <div>
          <h2>Home page</h2>
          <button onClick={logOut}>LOG OUT</button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logOutUser: () => dispatch(userLogoutRequest())
});
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);