import React, {useContext} from 'react';
import {ValuesContext} from '../../App';
import {auth} from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import SignIn from '../SignIn/SignIn';
import HeaderAndNavbar from '../HeaderAndNavbar/HeaderAndNavbar';
import './Home.css';

const Home = () => {

    const [user] = useAuthState(auth);
    const {mainContentShow} = useContext(ValuesContext);

    return (
        <div>
           {user ? (
           <>
           <HeaderAndNavbar/>
           {mainContentShow ? (
           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, error.</p> ) : "" }
           </>
           ) 
           : 
           <SignIn/>
           }
        </div>
    )
}

export default Home
