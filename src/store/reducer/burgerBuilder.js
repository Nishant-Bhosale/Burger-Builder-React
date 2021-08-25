import * as actionTypes from '../actions/actions';

const initialState = {
   ingredients: null,
   totalPrice: 4,
   error: false,
   building: false
}

const INGREDIENT_PRICES = {
   salad: 0.3,
   cheese: 0.4,
   meat: 1.3,
   bacon: 1
}

const reducer = (state = initialState, action) => {

   if(action.type === actionTypes.ADD_INGREDIENT){
      return {
         ...state,
         ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
         },
         totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
         building: true
      }
   }

   if(action.type === actionTypes.REMOVE_INGREDIENT){
      return {
         ...state,
         ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
         },
         
         totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
         building: true
      }
   }

   if(action.type === actionTypes.SET_INGREDIENTS){
      return {
         ...state,
         ingredients: action.ingredients,
         error: false,
         totalPrice: 4,
         building: false
      }
   }
   
   if(action.type === actionTypes.FETCH_INGREDIENTS_FAILED){
      return {
         ...state,
         error: true
      }
   }
   return state;
}

export default reducer;