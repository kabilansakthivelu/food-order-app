import React, {useContext, useState, useEffect} from 'react';
import {ValuesContext} from '../../App';
import {auth, db} from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import SignIn from '../SignIn/SignIn';
import HeaderAndNavbar from '../HeaderAndNavbar/HeaderAndNavbar';
import {FaPizzaSlice, FaHamburger, FaIceCream, FaCoffee} from 'react-icons/fa';
import {GiSandwich, GiManualJuicer, GiChocolateBar} from 'react-icons/gi';
import {BiRupee} from 'react-icons/bi';
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai';
import {Link} from 'react-router-dom';
import './Home.css';

const Home = () => {

    const [user] = useAuthState(auth);

    const {mainContentShow} = useContext(ValuesContext);

    const [categories, setCategories] = useState([]);

    const [foodItemsArray, setFoodItemsArray] = useState();

    const [cartValues, setCartValues] = useState(0);

    useEffect(()=>{
    db.collection('food').get().then((snapshot)=>{  
        const arr = [];
        snapshot.forEach((doc)=>{
            arr.push(doc.data())
    })
    setCategories(arr);
    })
    if(user){
        const test = db.collection('cart').doc(auth.currentUser.uid).collection('items');
        test.onSnapshot((snapshot)=>{
            const arr = [];
            snapshot.forEach((doc)=>{
                const test1 = doc.data();
                arr.push(test1);
            })
        setCartValues(arr);
        })}                                  
    },[user])

    const categorySelected = (id, name) =>{

        // document.getElementById(id).style.backgroundColor = "blue";
        const itemsRef = db.collection('food').doc(name).collection('foodItems');
        itemsRef.onSnapshot((snapshot)=>{
            let arr = [];
            snapshot.forEach((doc)=>{      
                arr.push(doc.data())
            })
            setFoodItemsArray(arr);
        })
    }

    const itemAddBtn = (id, name, price, number) =>{
        let number1 = 0;
        db.collection('cart').doc(auth.currentUser.uid).collection('items').doc(name).set({
            id,
            name,
            price,
            quantity: number1+1,
        })
        db.collection('cart').doc(auth.currentUser.uid).collection('items').doc(name).get().then((snapshot)=>{
            const itemDetails = snapshot.data();
            document.getElementById(number).innerHTML = itemDetails.quantity;
        })
    }

    const plusBtn = (id, name, price, number) =>{
        let number1 = document.getElementById(number).innerHTML;
        let number2 = parseInt(number1);
        db.collection('cart').doc(auth.currentUser.uid).collection('items').doc(name).set({
            id,
            name,
            price,
            quantity: number2+1,
        })
        db.collection('cart').doc(auth.currentUser.uid).collection('items').doc(name).get().then((snapshot)=>{
            const itemDetails = snapshot.data();
            document.getElementById(number).innerHTML = itemDetails.quantity;
        })
    }

     const minusBtn = (id, name, price, number) =>{
        let number1 = document.getElementById(number).innerHTML;
        let number2 = parseInt(number1);
        if(number2-1 === 0){
            db.collection('cart').doc(auth.currentUser.uid).collection('items').doc(name).delete();
        }else{
        db.collection('cart').doc(auth.currentUser.uid).collection('items').doc(name).set({
            id,
            name,
            price,
            quantity: number2-1,
        })
        db.collection('cart').doc(auth.currentUser.uid).collection('items').doc(name).get().then((snapshot)=>{
            const itemDetails = snapshot.data();
            document.getElementById(number).innerHTML = itemDetails.quantity;
        })
        }
    }

    return (               
        <div>                           
           {user ? (
           <div className="content">
           <HeaderAndNavbar/>
           {mainContentShow ? (
           <div className="foodArea">
           <h1 className="sectionTitle">Order Menu</h1>
           <h1 className="sectionSubTitle">Categories</h1>
           <div className="categoriesSection">
           {categories.map((type)=>{
               let image = ""; 
                switch(type.id){
                    case 1:
                        image = <FaPizzaSlice/>;
                        break;
                    case 2:
                        image = <FaHamburger/>;
                        break;
                    case 3:
                        image = <GiSandwich/>;
                        break;
                    case 4:
                        image = <GiManualJuicer/>;
                        break;
                    case 5:
                        image = <FaIceCream/>;
                        break;
                    case 6:
                        image = <FaCoffee/>;
                        break; 
                    default:
                        image = <GiChocolateBar/>;
                        break;
                        
                }
                return(
                <div className="individualCategory" key={type.id} onClick={()=>{categorySelected(type.id, type.name)}}>
                <div className="categoryIcon">
                {image}
                </div>
               <h1 className="categoryName">{type.name}</h1>
               </div>
           )})}
           </div>
           <p className="foodItemsTitle">Food Items</p>
           {foodItemsArray ? (
           <>
           <div className="foodItemsSection">
           {foodItemsArray.map((item)=>{
               const alreadyAddedToCart = cartValues.find((food)=>{
                   return food.id === item.id;
               })
               return(
                   <div key={item.id} className="individualFoodItem">
                    <img src={item.imageURL} alt="" className="itemImage" />
                    <h1 className="itemName">{item.name}</h1>
                    <div className="currAndPriceAlignment">
                    <BiRupee/>
                    <h1>{item.price}</h1>
                    </div>
                    
                    {alreadyAddedToCart ? (
                    <div id={item.price} className="indCartCounter">
                    <div className="cartCounter">
                    <AiOutlineMinus className="counterIcon" onClick={()=>{minusBtn(item.id, item.name, item.price, item.number)}}/>
                    <p id={item.number}>{alreadyAddedToCart.quantity}</p>
                    <AiOutlinePlus className="counterIcon" onClick={()=>{plusBtn(item.id, item.name, item.price, item.number)}}/>
                    </div>
                    </div>
                    )
                    :
                    <button id={item.id} className="addButton" onClick={()=>{itemAddBtn(item.id, item.name, item.price, item.number)}}>Add</button>
                    }
                   </div>
               )
           })}
           </div>
           </>
           ) : <h1 className="itemsDefaultDescription">Select a category from the above list to order your favorite items</h1>}
           {(cartValues.length > 0) ? (<Link to="/cart"><button id="toCartPage" className="toCartPage">View Cart</button></Link>) : ""}
           </div>
           ) : "" }
           </div>
           ) 
           : 
           <SignIn/>
           }
        </div>
    )
}

export default Home
