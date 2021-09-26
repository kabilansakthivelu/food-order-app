import React, {useState, useContext} from 'react';
import {ValuesContext} from '../../App';
import {GiHamburgerMenu} from 'react-icons/gi';
import {AiOutlineClose, AiFillHome, AiOutlineLogout} from 'react-icons/ai';
import {FaShoppingCart} from 'react-icons/fa';
import {RiBillLine} from 'react-icons/ri';
import {Link, useHistory} from 'react-router-dom';
import {auth} from '../../firebase';
import "./HeaderAndNavbar.css";

const Header = () => {

    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

    const [isHamburgerMenuShow, setIsHamburgerMenuShow] = useState(false);

    const {setMainContentShow} = useContext(ValuesContext);

    const hamburgerIconClick = () =>{
    setIsHamburgerOpen(!isHamburgerOpen);
    setIsHamburgerMenuShow(!isHamburgerMenuShow);
    setMainContentShow(false);
    }

    const hamburgerMenuDivClick = () =>{
    setIsHamburgerOpen(false);
    setIsHamburgerMenuShow(false);
    setMainContentShow(true);
    }

    const history = useHistory();

    const logout = () =>{
    auth.signOut(); 
    history.push("/");
    setMainContentShow(true);
    }

    return (
        <>

        {/* Header section */}

        <div className="header">
            <h1 className="headerTitle">Food Dunzo</h1>
            <div className="headerIcon" onClick={hamburgerIconClick}>
            {isHamburgerOpen ? <AiOutlineClose/> : <GiHamburgerMenu/>}
            </div>
        </div>

        {/* Navbar section */}

        {isHamburgerMenuShow ? (
        <div className="navbar">
            <Link to="/" className="hamburgerMenuList" onClick={hamburgerMenuDivClick}>
            <AiFillHome/>
            <h1>Home</h1>
            </Link>
            <Link to="/cart" className="hamburgerMenuList" onClick={hamburgerMenuDivClick}>
            <FaShoppingCart/>
            <h1>Cart</h1>
            </Link>
            <Link to="/bills" className="hamburgerMenuList" onClick={hamburgerMenuDivClick}>
            <RiBillLine/>
            <h1>Bills</h1>
            </Link>
            <div className="hamburgerMenuList" onClick={logout}>
            <AiOutlineLogout/>
            <h1>Log out</h1>
            </div>
        </div>
        )
        :
        ""
        }

        </>
    )
}

export default Header
