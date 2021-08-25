import React from "react";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredient";
// import BurgerBuilder from '../../containers/BurgerBuilder';
import "./Burger.css";

const Burger = (props) => {
	let transformedIngredients = Object.keys(props.ingredients)
		.map((igkey) => {
			return [...Array(props.ingredients[igkey])].map((el, i) => {
				return <BurgerIngredient key={igkey + i} type={igkey} />;
			});
		})
		.reduce((arr, el) => {
			return arr.concat(el);
		}, []);

	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please start adding Ingredients</p>;
	}

	return (
		<div className="Burger">
			<BurgerIngredient type="bread-top"></BurgerIngredient>
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom"></BurgerIngredient>
		</div>
	);
};

export default Burger;
