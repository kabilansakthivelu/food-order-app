import React, {useContext, useEffect, useState} from 'react';
import {auth, db} from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import SignIn from '../SignIn/SignIn';
import {ValuesContext} from "../../App";
import HeaderAndNavbar from '../HeaderAndNavbar/HeaderAndNavbar';
import {BiRupee} from 'react-icons/bi';
import './Bills.css';

const Bills = () => {

    const [user] = useAuthState(auth);
    const {mainContentShow} = useContext(ValuesContext);
    const [billName, setBillName] = useState([]);
    const [billContent, setBillContent] = useState([]);

    useEffect(()=>{
        if(user){
            const test = db.collection('bills').doc(auth.currentUser.uid).collection('billsCollection').orderBy('time', 'desc');
            test.onSnapshot((snapshot)=>{
                const billName1 = [];
                snapshot.forEach((doc)=>{
                billName1.push(doc.id);
                })
                setBillName(billName1);
            })
        }
    },[user])

    const billContentProvider = () =>{
        const arr = [];
            billName.map((bill)=>{
            return(
            db.collection('bills').doc(auth.currentUser.uid).collection('billsCollection').doc(bill).get().then((snapshot)=>{
                arr.push(snapshot.data())
                setBillContent(arr)
                }))
            })
    }

    useEffect(()=>{
            billContentProvider();
            if(billContent.length !== billName.length){
                billContentProvider()
            }
    },[billName])

    return (
        <div>
            {user ? (
            <div className="content">
            <HeaderAndNavbar/>
            {mainContentShow ? (
            <div className="billsSection">
            <h1 className="billsSectionTitle">Bills</h1>
            {(billContent.length > 0) ? 
            (
            billContent.map((bill)=>{

                const initialTime = parseInt(bill.time);
            const getTime = new Date(initialTime).toString();
            const setTime = getTime.split(" ");
            const time = setTime[1] +" "+ setTime[2] +" "+ setTime[3] + " at " + setTime[4] + " IST";

                return (
                <div key={bill.id} className="individualBill">
                <div className="billNoAndDate">
                <h1 className="individualBillNo">Bill No: {bill.time}</h1>
                <h1>{time}</h1>
                </div>
                <h1 className="individualBillNo">Delivered at:</h1>
                <h1 className="deliveryAddress">{bill.address1}</h1>
                <h1 className="deliveryAddress">{bill.address2}</h1>
                <h1 className="deliveryAddress">{bill.city}</h1>
                <h1 className="deliveryAddress">Phone: {bill.phone}</h1>
                <h1 className="individualBillNo">Food Items ordered:</h1>
                {bill.foodItems.map((item)=>{
                    return (
                        <div key={item.id} className="foodItems">
                            <div className="indFoodItem">
                            <div className="billAmount"> <span className="foodItemName"> {item.name} </span> --> {item.quantity} X {item.price} = </div>
                            <div className="billAmount">
                            <BiRupee/>
                            {item.totalAmount}
                            </div>
                            </div>
                        </div>
                    )
                })}
                <h1 className="finalBillAmount">Bill Amount:
                <div className="billAmount">
                <BiRupee/>
                {bill.total}
                </div>
                </h1>
                </div>
                )}
            )
            ) 
            : 
            (<h1 className="billDefaultDescription">
            You don't have any past orders. Place orders to view bills here
            </h1>)
            }
            </div>
            ) : ""}
            </div>)
            :
            <SignIn/>
            }
        </div>
    )
}

export default Bills
