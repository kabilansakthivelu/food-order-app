import React, {useContext} from 'react';
import {ValuesContext} from '../../App';
import {FcGoogle} from 'react-icons/fc';
import {AiOutlineMail, AiOutlineLock} from 'react-icons/ai';
import {Link, useHistory} from 'react-router-dom';
import firebase from 'firebase/compat/app';
import {auth, db} from '../../firebase';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignIn.css';

toast.configure();

const SignIn = () => {

    const {refEmail, refPassword} = useContext(ValuesContext);

    const history = useHistory();

    let userFirstName = "";

    const googleSignIn = async() =>{
        let provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);
        history.push("/");
        const name = auth.currentUser.displayName.split(" ");
        const firstName = name[0];
        toast.success(`Hey ${firstName}, Welcome !!`, {position: toast.POSITION.TOP_CENTER})
    }

    const signin = async(e) =>{
        e.preventDefault();
        const email = refEmail.current.value;
        const password = refPassword.current.value;
        try{
            await firebase.auth().signInWithEmailAndPassword(email, password);
            await db.collection('users').doc(auth.currentUser.uid).get().then((snapshot)=>{
                const userDetails = snapshot.data();
                const userName = userDetails.name;;
                const userName1 = userName.split(" ");
                userFirstName = userName1[0];
            })
            history.push("/");
            toast.success(`Welcome Back ${userFirstName} !!`, {position: toast.POSITION.TOP_CENTER})
        }
        catch(error){
            let error1 = error.message.split(":");
            let error2 = error1[1].split("(");
            toast.error(error2[0], {position: toast.POSITION.TOP_CENTER});
        }
    }

    const guestLogin = () =>{
        refEmail.current.value = process.env.REACT_APP_GUEST_EMAIL;
        refPassword.current.value = process.env.REACT_APP_GUEST_PASSWORD;
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
            <div className="googleSignInBtn" onClick={googleSignIn}>
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
            <input className="inputField" required ref={refEmail} type="email" name="email" id="email" placeholder="Email" />
            </div>

            <div className="inputFieldDiv">
            <AiOutlineLock className="inputFieldIcon"/>
            <input className="inputField" required ref={refPassword} type="password" name="password" id="password" placeholder="Password"/>
            </div>

            <button className="signInBtn">Sign In</button>

            <button className="signInBtn" onClick={guestLogin}>Guest Login</button>
            
            </form>

            <div className="footer">
            <p>New to Food Dunzo ?</p>
            <Link to="/signup" className="signUpLink">Register</Link>
            </div>
        </div>
        </div>
    )
}

export default SignIn
