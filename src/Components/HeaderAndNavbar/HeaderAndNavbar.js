import React, {useState} from 'react';
import {GiHamburgerMenu} from 'react-icons/gi';
import {AiOutlineClose, AiFillHome, AiOutlineLogout} from 'react-icons/ai';
import {FaShoppingCart} from 'react-icons/fa';
import {RiBillLine} from 'react-icons/ri';
import {Link} from 'react-router-dom';
import "./HeaderAndNavbar.css";

const Header = () => {

    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

    const [isHamnurgerMenuShow, setIsHamnurgerMenuShow] = useState(false);

    const hamburgerIconClick = () =>{
    setIsHamburgerOpen(!isHamburgerOpen);
    setIsHamnurgerMenuShow(!isHamnurgerMenuShow)
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

        {isHamnurgerMenuShow ? (
        <div className="navbar">
            <Link to="/" className="hamburgerMenuList" onClick={()=>{setIsHamnurgerMenuShow(false);setIsHamburgerOpen(false);}}>
            <AiFillHome/>
            <h1>Home</h1>
            </Link>
            <Link to="/cart" className="hamburgerMenuList" onClick={()=>{setIsHamnurgerMenuShow(false);setIsHamburgerOpen(false);}}>
            <FaShoppingCart/>
            <h1>Cart</h1>
            </Link>
            <Link to="/bills" className="hamburgerMenuList" onClick={()=>{setIsHamnurgerMenuShow(false);setIsHamburgerOpen(false);}}>
            <RiBillLine/>
            <h1>Bills</h1>
            </Link>
            <Link to="/logout" className="hamburgerMenuList" onClick={()=>{setIsHamnurgerMenuShow(false);setIsHamburgerOpen(false);}}>
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
