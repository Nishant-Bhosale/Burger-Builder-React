import axios from "../../axios-order";
import * as actionTypes from "./actions";

export const postOrderSuccess = (id, orderData) => {
	return {
		type: actionTypes.POST_ORDER_SUCCESS,
		orderId: id,
		orderData: orderData,
	};
};

export const postOrderFail = (error) => {
	return {
		type: actionTypes.POST_ORDER_FAIL,
		error: error,
	};
};

export const handleError = () => {
	return {
		type: actionTypes.HANDLE_ERROR,
	};
};

export const initPurchase = () => {
	return {
		type: actionTypes.INIT_PURCHASE,
	};
};

export const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders,
	};
};

export const fetchOrdersFail = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error: error,
	};
};

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START,
	};
};

export const fetchOrderHandler = (token, userId) => {
	fetchOrdersStart();
	return (dispatch) => {
		const queryParams =
			"?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
		axios
			.get("./orders.json" + queryParams)
			.then((res) => {
				console.log(res);
				const fetchedOrders = [];
				for (let key in res.data) {
					fetchedOrders.push({
						...res.data[key],
						id: key,
					});
				}
				dispatch(fetchOrdersSuccess(fetchedOrders));
			})
			.catch((err) => {
				dispatch(fetchOrdersFail(err));
			});
	};
};

export const postOrderHandler = (data, token) => {
	return (dispatch) => {
		dispatch(handleError());
		axios
			.post("/orders.json?auth=" + token, data)
			.then((response) => {
				dispatch(postOrderSuccess(response.data.name, data));
			})
			.catch((error) => dispatch(postOrderFail(error)));
	};
};
