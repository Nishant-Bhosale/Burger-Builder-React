import React from 'react';
import Burger from '../../Burger/Burger';
import './CheckoutSummary.css';
import Button from '../../Burger/UI/Button/Button';

const checkoutSummary = (props) => {


    return (
        <div className="CheckoutSummary">
            <h1>We hope it tastes well!!</h1>
            <div style={{width: '100%', height: 300, margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
                <Button btnType="Danger"
                        clicked={props.checkoutCancelled}>CANCEL</Button>
                <Button btnType="Success"
                        clicked={props.checkoutContinued}>CONTINUE</Button>
            </div>
        </div>)
}

export default checkoutSummary;