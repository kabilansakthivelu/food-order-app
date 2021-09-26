import React, {useContext, useState, useEffect} from 'react';
import {ValuesContext} from '../../App';
import {auth, db} from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import SignIn from '../SignIn/SignIn';
import HeaderAndNavbar from '../HeaderAndNavbar/HeaderAndNavbar';
import {FaPizzaSlice, FaHamburger, FaIceCream, FaCoffee} from 'react-icons/fa';
import {GiSandwich, GiManualJuicer, GiChocolateBar} from 'react-icons/gi';
import './Home.css';

const Home = () => {

    const [user] = useAuthState(auth);
    const {mainContentShow} = useContext(ValuesContext);

    const [categories, setCategories] = useState([]);

    useEffect(()=>{
    db.collection('food').get().then((snapshot)=>{  
        const arr = [];
        snapshot.forEach((doc)=>{
            arr.push(doc.data())
    })
    setCategories(arr);
    })                            
    },[])

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
                <div className="individualCategory" key={type.id}>
                <div className="categoryIcon">
                {image}
                </div>
               <h1 className="categoryName">{type.name}</h1>
               </div>
           )})}
           </div>
           <p className="foodItemsTitle">Food Items</p>
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
