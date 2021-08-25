import React from "react";
import Aux from "../../../hocs/Auxiliary";
import Button from "../UI/Button/Button";

const orderSummary = (props) => {
	const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
		return (
			<li key={igKey}>
				<span style={{ textTransform: "capitalize" }}>{igKey}</span>:
				{props.ingredients[igKey]}
			</li>
		);
	});
	return (
		<Aux>
			<h3>Your order</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>{ingredientSummary}</ul>
			<p>
				<strong>Total Price: ${props.totalPrice.toFixed(2)}</strong>
			</p>
			<p>Continue to Checkout</p>
			<Button btnType="Success" clicked={props.continuePurchase}>
				Continue
			</Button>
			<Button btnType="Danger" clicked={props.cancelPurchase}>
				Cancel
			</Button>
		</Aux>
	);
};

export default orderSummary;
