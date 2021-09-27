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

    let itemCounter = 0;

    const [user] = useAuthState(auth);
    const {mainContentShow} = useContext(ValuesContext);

    const [categories, setCategories] = useState([]);

    const [foodItemsArray, setFoodItemsArray] = useState();

    useEffect(()=>{
    db.collection('food').get().then((snapshot)=>{  
        const arr = [];
        snapshot.forEach((doc)=>{
            arr.push(doc.data())
    })
    setCategories(arr);
    })                                        
    },[])

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

    const itemAddBtn = (id, name, price) =>{
        document.getElementById(id).style.display = "none";
        document.getElementById(price).style.display = "block";
        itemCounter = 1;
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
               return(
                   <div key={item.id} className="individualFoodItem">
                    <img src={item.imageURL} alt="" className="itemImage" />
                    <h1 className="itemName">{item.name}</h1>
                    <div className="currAndPriceAlignment">
                    <BiRupee/>
                    <h1>{item.price}</h1>
                    </div>
                    
                    <button id={item.id} className="addButton" onClick={()=>{itemAddBtn(item.id, item.name, item.price)}}>Add</button>
                    
                    <div id={item.price} className="indCartCounter">
                    <div className="cartCounter">
                    <AiOutlineMinus/>
                    {itemCounter}
                    <AiOutlinePlus/>
                    </div>
                    </div>
                   </div>
               )
           })}
           </div>
           </>
           ) : <h1 className="itemsDefaultDescription">Select a category from the above list to order your favorite items</h1>}
           <Link to="/cart"><button id="toCartPage" className="toCartPage">View Cart</button></Link>
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
