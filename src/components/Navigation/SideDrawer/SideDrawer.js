import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import Aux from '../../../hocs/Auxiliary';
import Backdrop from '../../Burger/UI/BackDrop/BackDrop';

const sideDrawer = (props) => {
    let attachedClasses = ["SideDrawer", "Close"];
    if(props.open){
        attachedClasses = ["SideDrawer", "Open"]
    }

    return (
        <Aux>
            <Backdrop clicked={props.closed} show={props.open}/>
            <div className={attachedClasses.join(' ')}>

            <Logo />

            <nav>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
            </div>
        </Aux>
        
    );
}

export default sideDrawer;