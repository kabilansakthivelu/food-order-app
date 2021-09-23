import React from 'react';
import {auth} from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import SignIn from '../SignIn/SignIn';
import './Home.css';

const Home = () => {

    const [user] = useAuthState(auth);

    return (
        <div>
           {user ? <h1>Hello welcome user</h1> : <SignIn/>}
        </div>
    )
}

export default Home
