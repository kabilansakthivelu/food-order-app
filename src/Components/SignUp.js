import React from 'react';
import {AiOutlineMail, AiOutlineLock} from 'react-icons/ai';
import {FaUser} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import './SignIn/SignIn.css';

const SignUp = () => {

    // Since this page looks almost similar to Sign In page, the CSS file is imported from Sign In folder. And so, the classnames would be similar to Sign In page.

    const signup = (e) =>{
        e.preventDefault();
        console.log("test passed");
    }

    return (
        <div className="signInPage">

        {/* Sign Up page Left panel */}

        <div className="signInLeftPanel">
        </div>

        {/* Sign Up page right panel */}

        <div className="signInModal">
            <h1 className="title">Food Dunzo</h1>
            <p className="description">One stop for all your food needs</p>
            <p className="description">Create a new account</p>

            {/* Sign Up Form */}

            <form className="loginForm" onSubmit={signup}>

            <div className="inputFieldDiv">
            <FaUser className="inputFieldIcon"/>
            <input className="inputField" required type="text" name="username" id="username" placeholder="Username"/>
            </div>

            <div className="inputFieldDiv">
            <AiOutlineMail className="inputFieldIcon"/>
            <input className="inputField" required type="email" name="email" id="email" placeholder="Email" />
            </div>

            <div className="inputFieldDiv">
            <AiOutlineLock className="inputFieldIcon"/>
            <input className="inputField" required type="password" name="password" id="password" placeholder="Password"/>
            </div>

            <button className="signInBtn">Sign Up</button>
            </form>

            <div className="footer">
            <p>Already have an account?</p>
            <Link to="/signin" className="signUpLink">Log In</Link>
            </div>
        </div>
        </div>
    )
}

export default SignUp
