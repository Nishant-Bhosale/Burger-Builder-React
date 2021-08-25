import React, { Component } from "react";
import "./CheckoutData.css";
import Button from "../../../components/Burger/UI/Button/Button";
import axios from "../../../axios-order";
import Spinner from "../../../components/Burger/UI/Spinner/Spinner";
import { connect } from "react-redux";
import Input from "../../../components/Burger/UI/Input/Input";

import * as actions from "../../../store/actions/index";

class CheckoutData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: {
					placeholder: "Your Name",
					type: "text",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			street: {
				elementType: "input",
				elementConfig: {
					placeholder: "Your Street",
					type: "text",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			zipCode: {
				elementType: "input",
				elementConfig: {
					placeholder: "ZipCode",
					type: "text",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			country: {
				elementType: "input",
				elementConfig: {
					placeholder: "Your Country",
					type: "text",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			email: {
				elementType: "input",
				elementConfig: {
					placeholder: "Your Email",
					type: "text",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "fastest", displayValue: "Fastest" },
						{ value: "cheapest", displayValue: "Cheapest" },
					],
				},
				value: "fastest",
				valid: true,
			},
		},
		formIsValid: false,
	};

	orderHandler = (event) => {
		console.log(this.props);
		console.log(this.props.ings);
		console.log("done");

		const formData = {};

		for (let formIdentifier in this.state.orderForm) {
			formData[formIdentifier] = this.state.orderForm[formIdentifier].value;
		}

		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			data: formData,
			userId: this.props.userId,
		};

		this.props.onOrderBurger(order, this.props.token);
		event.preventDefault();
	};

	checkValidity(value, rules) {
		let isValid = true;
		if (!rules) {
			return isValid;
		}

		if (rules.required) {
			isValid = value.trim() !== "" && isValid;
		}

		return isValid;
	}

	inputChangedHandler = (event, elementIdentifier) => {
		const updatedInputForm = {
			...this.state.orderForm,
		};

		const updatedFormElement = {
			...updatedInputForm[elementIdentifier],
		};

		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation,
		);
		updatedFormElement.touched = true;
		updatedInputForm[elementIdentifier] = updatedFormElement;

		let formIsValid = true;

		for (let formIdentifier in updatedInputForm) {
			formIsValid = updatedInputForm[formIdentifier].valid && formIsValid;
		}
		this.setState({ orderForm: updatedInputForm, formIsValid: formIsValid });
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key],
			});
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map((formElement) => {
					return (
						<Input
							key={formElement.id}
							elementtype={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							invalid={!formElement.config.valid}
							shouldValidate={formElement.config.validation}
							touched={formElement.config.touched}
							value={formElement.config.value}
							changed={(event) =>
								this.inputChangedHandler(event, formElement.id)
							}
						/>
					);
				})}
				<Button btnType="Success" disabled={!this.state.formIsValid}>
					ORDER
				</Button>
			</form>
		);

		if (this.props.loading) {
			form = <Spinner />;
		}
		return (
			<div>
				<h4>Enter your contact data</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onOrderBurger: (orderData, token) =>
			dispatch(actions.postOrderHandler(orderData, token)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutData);
