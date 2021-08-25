import * as actionTypes from '../actions/actions';

const initialState = {
   order: [],
   loading: false,
   purchased: false
}


const orderReducer = (state = initialState, action) => {
   
   if(action.type === actionTypes.INIT_PURCHASE){
      return {
         ...state,
         purchased: false
      }
   }

   if(action.type === actionTypes.POST_ORDER_SUCCESS){
      const newOrder = {
         ...action.orderData,
         id: action.orderId
      }
      return {
         ...state,
         loading: false,
         purchased: true,
         order: state.order.concat(newOrder)
      }
   }

   if(action.type === actionTypes.POST_ORDER_FAIL){
      return {
         ...state,
         loading: true
      }
   }

   if(action.type === actionTypes.HANDLE_ERROR){
      return{
         ...state,
         loading: true
      }
   }

   if(action.type === actionTypes.FETCH_ORDERS_SUCCESS){
      return{
         ...state,
         order: action.orders,
         loading: false
      }
   }

   if(action.type === actionTypes.FETCH_ORDERS_FAIL){
      return {
         ...state,
         loading: false
      }
   }

   if(actionTypes.FETCH_ORDERS_START === action.type){
      return {
         ...state,
         loading: true
      }
   }
   return state;
}

export default orderReducer;