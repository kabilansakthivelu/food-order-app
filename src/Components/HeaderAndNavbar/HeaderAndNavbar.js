import React, {useState, useContext} from 'react';
import {ValuesContext} from '../../App';
import {GiHamburgerMenu} from 'react-icons/gi';
import {AiOutlineClose, AiFillHome, AiOutlineLogout} from 'react-icons/ai';
import {FaShoppingCart} from 'react-icons/fa';
import {RiBillLine} from 'react-icons/ri';
import {Link} from 'react-router-dom';
import "./HeaderAndNavbar.css";

const Header = () => {

    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

    const [isHamburgerMenuShow, setIsHamburgerMenuShow] = useState(false);

    const {mainContentShow, setMainContentShow} = useContext(ValuesContext);

    const hamburgerIconClick = () =>{
    setIsHamburgerOpen(!isHamburgerOpen);
    setIsHamburgerMenuShow(!isHamburgerMenuShow);
    setMainContentShow(!mainContentShow);
    }

    const hamburgerMenuDivClick = () =>{
    setIsHamburgerOpen(false);
    setIsHamburgerMenuShow(false);
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
            <Link to="/logout" className="hamburgerMenuList" onClick={hamburgerMenuDivClick}>
            <AiOutlineLogout/>
            <h1>Log out</h1>
            </Link>
        </div>
        )
        :
        ""
        }

        </>
    )
}

export default Header
