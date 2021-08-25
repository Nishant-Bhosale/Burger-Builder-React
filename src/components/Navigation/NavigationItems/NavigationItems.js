import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
        <ul className="NavigationItems">
            <NavigationItem link="/">Burger Builder</NavigationItem>
            {props.isAuthenticated ? <NavigationItem link="/orders">Order</NavigationItem> : null}
            {!props.isAuthenticated ? 
            <NavigationItem link="/auth">Authentication</NavigationItem> 
            : <NavigationItem link="/logout">Logout</NavigationItem>}
        </ul>
    );
}

export default navigationItems;