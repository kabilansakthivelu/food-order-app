import React, {useContext, useEffect, useState} from 'react';
import {auth, db} from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import SignIn from '../SignIn/SignIn';
import {ValuesContext} from '../../App';
import HeaderAndNavbar from '../HeaderAndNavbar/HeaderAndNavbar';
import {BiRupee} from 'react-icons/bi';
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai';
import './Cart.css';

const Cart = () => {

    const [user] = useAuthState(auth);
    const {mainContentShow} = useContext(ValuesContext);
    const [itemsInCart, setItemsInCart] = useState([]);
    const [finalTotal, setFinalTotal] = useState(0);

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

    useEffect(()=>{
        if(user){
        const test = db.collection('cart').doc(auth.currentUser.uid).collection('items');
        test.onSnapshot((snapshot)=>{
            const arr = [];
            snapshot.forEach((doc)=>{
                const test1 = doc.data();
                arr.push(test1);
            })
            setFinalTotal(arr.reduce((total, current)=>{
            total += current.totalAmount
            return total
            },0))
        })
    }
    },[itemsInCart])

    const cartItemsAdd = (id, name, price, quantityNew) =>{
        db.collection('cart').doc(auth.currentUser.uid).collection('items').doc(name).set({
            id,
            name,
            price,
            quantity: quantityNew+1,
            totalAmount : (price*(quantityNew+1)),
        })
    }

     const cartItemsMinus = (id, name, price, quantityNew) =>{
        if(quantityNew-1 === 0){
            db.collection('cart').doc(auth.currentUser.uid).collection('items').doc(name).delete();
        }else{
        db.collection('cart').doc(auth.currentUser.uid).collection('items').doc(name).set({
            id,
            name,
            price,
            quantity: quantityNew-1,
            totalAmount : (price*(quantityNew-1)),
        })
        }
    }

    const cartClear = () =>{
        const test = db.collection('cart').doc(auth.currentUser.uid).collection('items');
        test.onSnapshot((snapshot)=>{
            const arr = [];
            snapshot.forEach((doc)=>{
                const item = doc.data();
                arr.push(item.name);
            })
            arr.forEach((name)=>{
                db.collection('cart').doc(auth.currentUser.uid).collection('items').doc(name).delete();
            })
        })
        }


    return (
        <div>
            {user ? (
            <div className="content">
            <HeaderAndNavbar/>
            {mainContentShow ? (
            <div className="cartArea">
            <h1 className="sectionCartTitle">Cart</h1>
            {itemsInCart.length !== 0 ? (
                <div>
                {itemsInCart.map((food)=>{
                    return (
                        <div key={food.id} className="individualCartsItem">
                            <div className="cartFirstLine">
                            <h1 className="cartItemName">{food.name}</h1>
                            <h1 className="cartRupeesAlignment">
                            <AiOutlineMinus className="cartsCounterIcons" onClick={()=>{cartItemsMinus(food.id, food.name, food.price, food.quantity)}}/>&nbsp;&nbsp;
                            {food.quantity}&nbsp;&nbsp;
                            <AiOutlinePlus className="cartsCounterIcons" onClick={()=>{cartItemsAdd(food.id, food.name, food.price, food.quantity)}}/></h1>
                            </div>
                            <div className="cartSecondLine">
                            <h1 className="cartRupeesAlignment"><BiRupee/>{food.price}</h1>
                            <h1 className="cartRupeesAlignment"><BiRupee/>{food.totalAmount}</h1>
                            </div>
                        </div>
                    )
                })}
                <h1 className="totalAmountFinal">Total amount: <BiRupee/>&nbsp;{finalTotal}</h1>
                <div className="cartPageBtn">
                <h1 className="cartPageIndividualBtn">Checkout</h1>
                <h1 className="cartPageIndividualBtn" onClick={cartClear}>Clear cart</h1>
                </div>
            </div>)
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
