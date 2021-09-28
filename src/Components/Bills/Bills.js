import React, {useContext, useEffect, useState} from 'react';
import {auth, db} from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import SignIn from '../SignIn/SignIn';
import {ValuesContext} from "../../App";
import HeaderAndNavbar from '../HeaderAndNavbar/HeaderAndNavbar';
import './Bills.css';

const Bills = () => {

    const [user] = useAuthState(auth);
    const {mainContentShow} = useContext(ValuesContext);
    const [billName, setBillName] = useState([]);
    const [billContent, setBillContent] = useState([]);

    useEffect(()=>{
        if(user){
            const test = db.collection('bills').doc(auth.currentUser.uid).collection('billsCollection');
            test.onSnapshot((snapshot)=>{
                const billName1 = [];
                snapshot.forEach((doc)=>{
                billName1.push(doc.id);
                })
                setBillName(billName1);
            })
        }
    },[user])

    useEffect(()=>{
            const arr = [];
            billName.map((bill)=>{
            db.collection('bills').doc(auth.currentUser.uid).collection('billsCollection').doc(bill).get().then((snapshot)=>{
                const test = snapshot.data();
                arr.push(test);
                setBillContent(arr)
                })
            })
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
                return (
                <div key={bill.id}>
                <p>{bill.address1}</p>
                </div>
                )}
            )
            ) 
            : 
            (<h1 className="billDefaultDescription">
            You don't have any past orders. Place an order to view bills here
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
