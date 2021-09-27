import React, {useContext, useEffect, useState} from 'react';
import {auth, db} from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import SignIn from '../SignIn/SignIn';
import {ValuesContext} from '../../App';
import HeaderAndNavbar from '../HeaderAndNavbar/HeaderAndNavbar';
import './Cart.css';

const Cart = () => {

    const [user] = useAuthState(auth);
    const {mainContentShow} = useContext(ValuesContext);
    const [itemsInCart, setItemsInCart] = useState([]);

    useEffect(()=>{
        if(user){
        const test = db.collection('cart').doc(auth.currentUser.uid).collection('items');
        test.onSnapshot((snapshot)=>{
            const arr = [];
            snapshot.forEach((doc)=>{
                const test1 = doc.data();
                arr.push(test1);
            })
        setItemsInCart(arr);
        })}
    },[user])

    return (
        <div>
            {user ? (
            <div className="content">
            <HeaderAndNavbar/>
            {mainContentShow ? (
            <div className="cartArea">
            <h1 className="sectionTitle">Cart</h1>
            {itemsInCart.length !== 0 ? (
                itemsInCart.map((food)=>{
                    return (
                        <div key={food.id} className="cartsItem">
                            <h1>{food.name}</h1>
                            <h1>{food.quantity}</h1>
                            <h1>{food.price}</h1>
                        </div>
                    )
                })
            )
            :
            (<h1 className="cartDefaultDescription">
            You don't have any items in cart. Add items to view here
            </h1>)}
            </div>
            )
            :
            ""
        }
        </div>)
        :
        <SignIn/>}
        </div>
    )
}

export default Cart
