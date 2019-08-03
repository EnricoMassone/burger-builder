import React from "react";
import styles from "./BurgerPreview.module.css";
import BurgerIngredient from "./BurgerIngredient";
import PropTypes from "prop-types";

const burgerPreview = props => {
  const burgerIngredients = Object
    .keys(props.ingredients)
    .filter(ingredient => ingredient !== "bread-top" && ingredient !== "bread-bottom")
    .flatMap(ingredient => {
      const quantity = props.ingredients[ingredient];

      return Array(quantity).fill(null).map((_, index) => {
        const key = `${ingredient}-${index + 1}`;
        return <BurgerIngredient type={ingredient} key={key} />;
      });
    });

  const burgerInnerContent = burgerIngredients.length === 0 ?
    <p>Please start adding ingredients!</p> :
    burgerIngredients;

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {burgerInnerContent}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

burgerPreview.propTypes = {
  ingredients: PropTypes.shape({
    salad: PropTypes.number,
    bacon: PropTypes.number,
    cheese: PropTypes.number,
    meat: PropTypes.number
  }).isRequired
};

export default burgerPreview;