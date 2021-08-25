import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import './BuildControls.css';

const controls = [
    {label: 'Salad', type:'salad'},
    {label: 'Cheese', type:'cheese'},

    {label: 'Meat', type:'meat'},
    {label: 'Bacon', type:'bacon'},
]

const buildControls = (props) => {
    return (
        <div className="BuildControls">
            {controls.map((ctrl) => {
                return <BuildControl 
                label={ctrl.label}
                key={ctrl.label}
                added={() => props.ingredientsAdder(ctrl.type)}
                removed={() => props.removeIngredient(ctrl.type)}
                disabled={props.disableButton[ctrl.type]}
                />
            })}
            <button className="OrderButton" disabled={!props.purchasable}
            onClick={props.click}>{props.isAuth ? 'ORDER NOW' : 'SIGNUP TO CONTINUE'}</button>
        </div>
    );
}

export default buildControls;