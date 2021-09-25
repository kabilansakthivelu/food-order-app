import React from 'react';
import {auth} from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import SignIn from '../SignIn/SignIn';
import HeaderAndNavbar from '../HeaderAndNavbar/HeaderAndNavbar';
import './Home.css';

const Home = () => {

    const [user] = useAuthState(auth);

    return (
        <div>
           {user ? (
           <>
           <HeaderAndNavbar/>
           </>
           ) 
           : 
           <SignIn/>
           }
        </div>
    )
}

export default Home
