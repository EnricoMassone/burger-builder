import React from "react";
import styles from "./BuildControl.module.css";
import PropTypes from "prop-types";

const buildControl = props => (
  <div className={styles.BuildControl}>

    <div className={styles.Label}>
      {props.ingredientLabel}
    </div>

    <button
      disabled={props.disableRemoveButton}
      data-ingredient-type={props.ingredientType}
      onClick={props.onIngredientRemoved}
      className={styles.Less}>Less</button>

    <button
      data-ingredient-type={props.ingredientType}
      onClick={props.onIngredientAdded}
      className={styles.More}>More</button>

  </div>
);

buildControl.propTypes = {
  ingredientLabel: PropTypes.string.isRequired,
  ingredientType: PropTypes.string.isRequired,
  onIngredientAdded: PropTypes.func.isRequired,
  onIngredientRemoved: PropTypes.func.isRequired,
  disableRemoveButton: PropTypes.bool.isRequired
};

export default buildControl;