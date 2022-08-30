import React from 'react';
import {
    useNavigate
} from "react-router-dom";
import {
    userLogoutRequest
} from '../../redux/auth/auth.actions'
import { connect } from 'react-redux'

const HomePage = ({
                      logOutUser,
                      auth: { isLoading, errorMessage, userObject },}) => {

    let navigate = useNavigate();

    async function logOut(){
        await logOutUser()
        navigate("/login");
    }

    return (
        <div>
            <h2>Home page</h2>
            <button onClick={logOut}>LOG OUT</button>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    logOutUser: () => dispatch(userLogoutRequest()),
})
const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)