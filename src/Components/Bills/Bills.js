import React, {useContext} from 'react';
import {auth} from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import SignIn from '../SignIn/SignIn';
import {ValuesContext} from "../../App";
import HeaderAndNavbar from '../HeaderAndNavbar/HeaderAndNavbar';
import './Bills.css';

const Bills = () => {

    const [user] = useAuthState(auth);
    const {mainContentShow} = useContext(ValuesContext);

    return (
        <div>
            {user ? (
            <div className="content">
            <HeaderAndNavbar/>
            {mainContentShow ? (
            <div>
            <h1>Bills</h1>
            </div>
            ) : ""}
            </div>)
            :
            <SignIn/>
            }
        </div>
    )
}

export default Bills
