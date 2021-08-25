import React from 'react';
import Aux from '../../../../hocs/Auxiliary';
import BackDrop from '../BackDrop/BackDrop';
import './Modal.css';


const modal = (props) => {
    
    return (
        <Aux>
            <BackDrop show={props.purchasing} clicked={props.cancelPurchase}/>
            <div className="Modal"
            style={{transform: props.purchasing ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.purchasing ? '1' : '0'}}
                    onClick={props.removeBackdrop}>
                {props.children}
            </div>
        </Aux>
    );
}

export default modal;