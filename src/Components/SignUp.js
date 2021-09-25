import React,{useContext, useRef} from 'react';
import {AiOutlineMail, AiOutlineLock} from 'react-icons/ai';
import {FaUser} from 'react-icons/fa';
import firebase from 'firebase/compat/app';
import {db, auth} from '../firebase';
import {Link, useHistory} from 'react-router-dom';
import {ValuesContext} from '../App';
import {toast} from 'react-toastify';
import './SignIn/SignIn.css';

toast.configure();

const SignUp = () => {

    // Since this page looks almost similar to Sign In page, the CSS file is imported from Sign In folder. And so, the classnames would be similar to Sign In page.

    const {refEmail, refPassword} = useContext(ValuesContext);

    const refUsername = useRef();

    const history = useHistory();

    let userFirstName = "";

    const signup = async(e) =>{
        e.preventDefault();
        const username = refUsername.current.value;
        const email = refEmail.current.value;
        const password = refPassword.current.value;
        if(username[0]=== " "){
            toast.error("Please don't start with 'SPACE'. Enter a valid username.", {position: toast.POSITION.TOP_CENTER});
        }
        else
        {
        try{
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            await db.collection('users').doc(auth.currentUser.uid).set({name:username});
            await db.collection('users').doc(auth.currentUser.uid).get().then((snapshot)=>{
                const userDetails = snapshot.data();
                const userName = userDetails.name;;
                const userName1 = userName.split(" ");
                userFirstName = userName1[0];
            });
            history.push("/");
            toast.success(`Hi ${userFirstName}, Welcome to Food Dunzo !!`, {position: toast.POSITION.TOP_CENTER});
        }
        catch(error){
            let error1 = error.message.split(":");
            let error2 = error1[1].split("(");
            toast.error(error2[0], {position: toast.POSITION.TOP_CENTER});
        }
        }
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
            <input className="inputField" required type="text" name="username" id="username" placeholder="Username" ref={refUsername}/>
            </div>

            <div className="inputFieldDiv">
            <AiOutlineMail className="inputFieldIcon"/>
            <input className="inputField" required type="email" name="email" id="email" placeholder="Email" ref={refEmail} />
            </div>

            <div className="inputFieldDiv">
            <AiOutlineLock className="inputFieldIcon"/>
            <input className="inputField" required type="password" name="password" id="password" placeholder="Password" ref={refPassword}/>
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
