import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-order";
import withErrorHandler from "../../hocs/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/Burger/UI/Spinner/Spinner";

class MyOrder extends Component {
	componentDidMount() {
		console.log("hello");
		this.props.onFetchOrders(this.props.token, this.props.userId);
	}

	render() {
		//  console.log(this.state.orders);
		let spinner = <Spinner />;
		if (!this.props.loading) {
			spinner = this.props.orders.map((order) => (
				<Order
					key={order.id}
					ingredients={order.ingredients}
					totalPrice={order.price}
				/>
			));
		}
		return <div>{spinner}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		orders: state.order.order,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrders: (token, userId) =>
			dispatch(actions.fetchOrderHandler(token, userId)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withErrorHandler(MyOrder, axios));
