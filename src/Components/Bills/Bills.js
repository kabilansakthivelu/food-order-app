import React, {useContext} from 'react';
import {ValuesContext} from "../../App";
import HeaderAndNavbar from '../HeaderAndNavbar/HeaderAndNavbar';
import './Bills.css';

const Bills = () => {

    const {mainContentShow} = useContext(ValuesContext);

    return (
        <div>
            <HeaderAndNavbar/>
            {mainContentShow ? (
            <div>
            <h1>Bills</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut repudiandae officia est earum odio praesentium, ipsa, perspiciatis rerum molestias fugit nihil necessitatibus id, ullam consectetur exercitationem saepe! Exercitationem et tempore illum eum mollitia repellendus magni pariatur quam impedit, hic eveniet voluptatum at commodi sed esse vitae, voluptate eos laborum architecto harum. Aperiam cum voluptas hic ipsam minima autem ratione, rerum totam eveniet nam dolorum maxime repudiandae numquam excepturi! Quos esse sunt voluptatibus necessitatibus iusto ea voluptatum, dignissimos est ratione? Delectus libero, laudantium fuga, aut sed voluptatem non consequuntur omnis iusto vero eveniet nulla sint facere! Voluptatibus accusantium fuga vitae reprehenderit.</p>
            </div>
            ) : ""}
        </div>
    )
}

export default Bills
