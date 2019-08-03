import React from "react";
import styles from "./BuildControls.module.css";
import BuildControl from "./BuildControl";
import PropTypes from "prop-types";

const controls = [
  { type: "salad", label: "Salad" },
  { type: "bacon", label: "Bacon" },
  { type: "cheese", label: "Cheese" },
  { type: "meat", label: "Meat" }
];

const buildControls = props => {

  const buildControls = controls
    .map(control => {
      const disableRemoveButton = props.disableIngredientRemovalMap.get(control.type);

      return (
        <BuildControl
          ingredientLabel={control.label}
          ingredientType={control.type}
          onIngredientAdded={props.onIngredientAdded}
          onIngredientRemoved={props.onIngredientRemoved}
          key={control.type}
          disableRemoveButton={disableRemoveButton} />
      );
    });

  return (
    <div className={styles.BuildControls}>
      <p>
        Current price: <strong>$ {props.price.toFixed(2)}</strong>
      </p>

      {buildControls}

      <button
        disabled={!props.canOrder}
        className={styles.OrderButton}
        onClick={props.onOrderNowClicked}>Order now</button>
    </div>
  );
}

buildControls.propTypes = {
  onIngredientAdded: PropTypes.func.isRequired,
  onIngredientRemoved: PropTypes.func.isRequired,
  disableIngredientRemovalMap: PropTypes.instanceOf(Map).isRequired,
  price: PropTypes.number.isRequired,
  canOrder: PropTypes.bool.isRequired,
  onOrderNowClicked: PropTypes.func.isRequired
};

export default buildControls;