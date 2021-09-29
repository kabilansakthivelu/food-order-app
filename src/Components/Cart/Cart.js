import React, {useContext, useEffect, useState, useRef} from 'react';
import {auth, db} from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import SignIn from '../SignIn/SignIn';
import {ValuesContext} from '../../App';
import HeaderAndNavbar from '../HeaderAndNavbar/HeaderAndNavbar';
import {BiRupee} from 'react-icons/bi';
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai';
import Modal from 'react-modal';
import {toast} from 'react-toastify';
import './Cart.css';

toast.configure();

const Cart = () => {

    const [user] = useAuthState(auth);
    const {mainContentShow} = useContext(ValuesContext);
    const [itemsInCart, setItemsInCart] = useState([]);
    const [finalTotal, setFinalTotal] = useState(0);
    const [isCheckOutModal, setIsCheckOutModal] = useState(false);
    const refAddress1 = useRef();
    const refAddress2 = useRef();
    const refCity = useRef();
    const refPhone = useRef();

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
        test.get().then((snapshot)=>{
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

        const checkOutFn = () =>{
            setIsCheckOutModal(true);
        }

         const orderPlacement = async(e) =>{
            e.preventDefault();
            const time = (new Date()).getTime().toString();
            const address1 = refAddress1.current.value;
            const address2 = refAddress2.current.value;
            const city = refCity.current.value;
            const phone = refPhone.current.value;
            if((address1[0] === " ") || (address2[0] === " ") || (city[0] === " ")){
                toast.error("Please don't start with 'SPACE'. Enter a valid username.", {position: toast.POSITION.TOP_CENTER});
            }
            else
            {   
                const test = db.collection('cart').doc(auth.currentUser.uid).collection('items');
                test.get().then((snapshot)=>{
                const arr = [];
                snapshot.forEach((doc)=>{
                const item = doc.data();
                arr.push(item);
                })
                db.collection('bills').doc(auth.currentUser.uid).collection('billsCollection').doc(time).set({
                    foodItems: arr,
                    time,
                    address1,
                    address2,
                    city,
                    phone,
                    total: finalTotal,
                    id: time,
                });
                })
                cartClear();
                setIsCheckOutModal(false);
                toast.success("Your order is placed successfully, Tasty food is en route.", {position: toast.POSITION.TOP_CENTER});
            }
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
                <h1 className="cartPageIndividualBtn" onClick={checkOutFn}>Checkout</h1>
                <h1 className="cartPageIndividualBtn" onClick={cartClear}>Clear cart</h1>
                </div>

                {/* Checkout Modal */}

                <Modal isOpen={isCheckOutModal} className="checkoutModal">

                <h1 className="modalTitle">Please provide your address</h1>

                <form onSubmit={orderPlacement}>

                    <div className="modalFields">
                    <label htmlFor="address1">Address 1: &nbsp;</label>
                    <input required maxLength="30" ref={refAddress1} type="text" id="address1" name="address1" className="modalInputFields"/>
                    </div>

                    <div className="modalFields">
                    <label htmlFor="address2">Address 2: &nbsp;</label>
                    <input required maxLength="30" ref={refAddress2} type="text" id="address2" name="address1" className="modalInputFields"/>
                    </div>

                    <div className="modalFields">
                    <label htmlFor="city">City/Town: &nbsp;</label>
                    <input required maxLength="30" ref={refCity} type="text" id="city" name="city" className="modalInputFields"/>
                    </div>

                    <div className="modalFields">
                    <label htmlFor="phone">Phone No: &nbsp;</label>
                    <input required maxLength="13" ref={refPhone} type="number" id="phone" name="phone" className="modalInputFields"/>
                    </div>

                    <div className="modalBtn">
                    <button className="modalIndividualBtn" >Place Order</button>
                    <button className="modalIndividualBtn" onClick={()=>{setIsCheckOutModal(false)}}>Cancel</button>
                    </div>

                </form>

                </Modal>

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
