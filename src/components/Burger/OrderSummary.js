import React from "react";
import PropTypes from "prop-types";
import Aux from "../../hoc/Auxiliary";
import Button from "../UI/Button";

const orderSummary = props => {

  const ingredients = Object
    .keys(props.ingredients)
    .filter(ingredientType => props.ingredients[ingredientType] > 0)
    .map(ingredientType => (
      <li key={ingredientType}>
        <span style={{ textTransform: "capitalize" }}>{ingredientType}</span>: {props.ingredients[ingredientType]}
      </li>
    ));

  return (
    <Aux>
      <h3 style={{ textAlign: "center" }}>Your order</h3>
      {
        ingredients.length > 0 ?
          (
            <Aux>
              <p>A delicious burger with the following ingredients:</p>

              <ul>
                {ingredients}
              </ul>

              <p>
                <strong>Total price: $ {props.price.toFixed(2)}</strong>
              </p>

              <p>Continue to checkout ?</p>

              <Button buttonType="Danger" onClick={props.onOrderCancelled}>
                <span style={{ textTransform: "uppercase" }}>cancel</span>
              </Button>
              <Button buttonType="Success" onClick={props.onOrderConfirmed}>
                <span style={{ textTransform: "uppercase" }}>confirm</span>
              </Button>
            </Aux>
          ) : (
            <p>Your order is empty. Add some ingredients and come here later</p>
          )
      }
    </Aux>
  );
};

orderSummary.propTypes = {
  ingredients: PropTypes.shape({
    salad: PropTypes.number,
    bacon: PropTypes.number,
    cheese: PropTypes.number,
    meat: PropTypes.number
  }).isRequired,
  onOrderCancelled: PropTypes.func.isRequired,
  onOrderConfirmed: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired
};

export default orderSummary;