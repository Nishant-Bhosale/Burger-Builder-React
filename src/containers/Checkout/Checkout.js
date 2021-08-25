import React, { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
// import axios from 'axios';
import { connect } from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import CheckoutData from "./ContactData/CheckoutData";

class Checkout extends Component {
	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinuedHandler = () => {
		this.props.history.replace("./contact-data");
	};

	render() {
		let summary = <Redirect to="/" />;
		if (this.props.ings) {
			const purchasedRedirect = this.props.purchased ? (
				<Redirect to="/" />
			) : null;
			summary = (
				<div>
					{purchasedRedirect}
					<CheckoutSummary
						ingredients={this.props.ings}
						checkoutCancelled={this.checkoutCancelledHandler}
						checkoutContinued={this.checkoutContinuedHandler}
					/>
					<Route
						path={this.props.match.path + "/contact-data"}
						component={CheckoutData}
					/>
				</div>
			);
		}
		return summary;
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased,
	};
};

export default connect(mapStateToProps)(withRouter(Checkout));
