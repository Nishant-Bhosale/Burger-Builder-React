import * as actionTypes from './actions';
import axios from '../../axios-order';

export const addIngredient = (name) => {
   return {
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: name
   }
}

export const removeIngredient = (name) => {
   return {
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: name
   }
}

export const fetchIngredientsFailed = () => {
   return {
      type: actionTypes.FETCH_INGREDIENTS_FAILED
   }
}

export const setIngredients = (ingredients) => {
   return {
      type: actionTypes.SET_INGREDIENTS,
      ingredients: ingredients
   }
}

export const initIngredient = () => {
   return dispatch => {
      axios.get('/ingredients.json')
            .then(response => {
               dispatch(setIngredients(response.data))
            })
            .catch(error => {
               dispatch(fetchIngredientsFailed())
            })
   }
}