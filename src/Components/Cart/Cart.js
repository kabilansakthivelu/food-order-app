import React, {useContext} from 'react';
import {ValuesContext} from '../../App';
import HeaderAndNavbar from '../HeaderAndNavbar/HeaderAndNavbar';
import './Cart.css';

const Cart = () => {

    const {mainContentShow} = useContext(ValuesContext);

    return (
        <div>
            <HeaderAndNavbar/>
            {mainContentShow ? (
            <div>
            <h1>Cart</h1>
            </div>
            )
            :
            ""
        }
        </div>
    )
}

export default Cart
