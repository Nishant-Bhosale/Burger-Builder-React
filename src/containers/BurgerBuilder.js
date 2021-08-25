import React, { Component } from "react";
import Burger from "../components/Burger/Burger";
import Aux from "../hocs/Auxiliary";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/Burger/UI/Modal/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";
import axios from "../axios-order";

import Spinner from "../components/Burger/UI/Spinner/Spinner";
import withErrorHandler from "../hocs/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as burgerBuilderActions from "../store/actions/index";

class BurgerBuilder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			purchasing: false,
			loading: false,
		};
	}

	componentDidMount() {
		console.log("hello");
		this.props.fetchIngredients();
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);

		return sum > 0;
	}

	purchaseHandler = () => {
		if (this.props.isAuth) {
			this.setState({
				purchasing: true,
			});
		} else {
			this.props.onSetAuthRedirectPath("/checkout");
			this.props.history.push("/auth");
		}
	};

	purchaseCancelHandler = () => {
		this.setState({
			purchasing: false,
		});
	};

	continuePurchaseHandler = () => {
		this.props.onInitPurchase();
		this.props.history.push("/checkout");
	};

	render() {
		const disabledInfo = {
			...this.props.ings,
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		let burger = this.props.error ? (
			<p>Ingredient's can't be loaded!!</p>
		) : (
			<Spinner />
		);

		if (this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<h3>
						Current Price: <strong>{this.props.price.toFixed(2)}</strong>
					</h3>
					<BuildControls
						ingredientsAdder={this.props.addIngredientHandler}
						removeIngredient={this.props.removeIngredientHandler}
						disableButton={disabledInfo}
						purchasable={this.updatePurchaseState(this.props.ings)}
						isAuth={this.props.auth}
						click={this.purchaseHandler}
					/>
				</Aux>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					totalPrice={this.props.price}
					cancelPurchase={this.purchaseCancelHandler}
					continuePurchase={this.continuePurchaseHandler}
				/>
			);
		}

		return (
			<Aux>
				<Modal
					purchasing={this.state.purchasing}
					cancelPurchase={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		auth: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addIngredientHandler: (ingName) =>
			dispatch(burgerBuilderActions.addIngredient(ingName)),
		removeIngredientHandler: (ingName) =>
			dispatch(burgerBuilderActions.removeIngredient(ingName)),
		fetchIngredients: () => dispatch(burgerBuilderActions.initIngredient()),
		onInitPurchase: () => dispatch(burgerBuilderActions.initPurchase()),
		onSetAuthRedirectPath: (path) =>
			dispatch(burgerBuilderActions.setAuthRedirectPath(path)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withErrorHandler(BurgerBuilder, axios));
