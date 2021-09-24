import React from 'react';
import {FcGoogle} from 'react-icons/fc';
import {AiOutlineMail, AiOutlineLock} from 'react-icons/ai';
import {Link} from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {

    const signin = (e) =>{
        e.preventDefault();
        console.log("hello all");
    }

    return (
        <div className="signInPage">

        {/* Sign In page Left panel */}

        <div className="signInLeftPanel">
        </div>

        {/* Sign In page right panel */}

        <div className="signInModal">
            <h1 className="title">Food Dunzo</h1>
            <p className="description">One stop for all your food needs</p>
            <div className="googleSignInBtn">
            <FcGoogle className="googleIcon"/>
            <p className="googleSignInBtnDesc">Continue with Google</p>
            </div>

            <div className="orDividerDiv">
            <hr className="orDividerRuler"/>
            <p className="orDivider">or</p>
            <hr className="orDividerRuler"/>
            </div>

            {/* Login Form */}

            <form className="loginForm" onSubmit={signin}>

            <div className="inputFieldDiv">
            <AiOutlineMail className="inputFieldIcon"/>
            <input className="inputField" required type="email" name="email" id="email" placeholder="Email" />
            </div>

            <div className="inputFieldDiv">
            <AiOutlineLock className="inputFieldIcon"/>
            <input className="inputField" required type="password" name="password" id="password" placeholder="Password"/>
            </div>

            <button className="signInBtn">Sign In</button>
            </form>

            <div className="footer">
            <p>Don't have an account?</p>
            <Link to="/signup" className="signUpLink">Register</Link>
            </div>
        </div>
        </div>
    )
}

export default SignIn
