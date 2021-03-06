import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import BurgerPreview from "../../components/Burger/BurgerPreview";
import BuildControls from "../../components/Burger/BuildControls";
import Modal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/OrderSummary";

const basePrice = 4;

const priceLookup = new Map([["salad", 1], ["bacon", 1], ["cheese", 1], ["meat", 1]]);

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    price: basePrice,
    isPurchasable: false,
    isPurchaseMode: false
  };

  onIngredientAdded = event => {
    const ingredientType = event.target.dataset.ingredientType;
    this.addIngredient(ingredientType);
  };

  onIngredientRemoved = event => {
    const ingredientType = event.target.dataset.ingredientType;
    this.removeIngredient(ingredientType);
  };

  addIngredient = ingredientType => {
    const { ingredients: currentIngredients } = this.state;

    const updatedIngredients = { ...currentIngredients }; // clone the object (remember to always create new objects instead of mutating existing ones)

    const currentIngredientQuantity = updatedIngredients[ingredientType];
    const isIngredientAddedForTheFirstTime = currentIngredientQuantity === undefined;
    const updatedIngredientQuantity = isIngredientAddedForTheFirstTime ?
      1 :
      (currentIngredientQuantity + 1);

    updatedIngredients[ingredientType] = updatedIngredientQuantity;

    const updatedPrice = this.computePrice(updatedIngredients);
    const updatedIsPurchasable = this.computeIsPurchasable(updatedIngredients);

    this.setState({
      ingredients: updatedIngredients,
      price: updatedPrice,
      isPurchasable: updatedIsPurchasable
    });
  };

  removeIngredient = ingredientType => {
    const { ingredients: currentIngredients } = this.state;

    const updatedIngredients = { ...currentIngredients }; // clone the object (remember to always create new objects instead of mutating existing ones)

    const currentIngredientQuantity = updatedIngredients[ingredientType];
    const isIngredientAlreadyInTheBurger = currentIngredientQuantity !== undefined;
    if (!isIngredientAlreadyInTheBurger) {
      return;
    }
    if (currentIngredientQuantity <= 0) {
      return;
    }
    const updatedIngredientQuantity = currentIngredientQuantity - 1;

    updatedIngredients[ingredientType] = updatedIngredientQuantity;

    const updatedPrice = this.computePrice(updatedIngredients);
    const updatedIsPurchasable = this.computeIsPurchasable(updatedIngredients);

    this.setState({
      ingredients: updatedIngredients,
      price: updatedPrice,
      isPurchasable: updatedIsPurchasable
    });
  };

  computePrice = ingredients => {
    const price = Object.keys(ingredients).reduce((memo, item) => {
      const ingredientPrice = priceLookup.get(item);
      if (ingredientPrice === undefined) {
        throw new Error(`Price for ingredient ${item} is not available`);
      }

      const ingredientQuantity = ingredients[item];

      return memo + (ingredientPrice * ingredientQuantity);
    }, basePrice);
    return price;
  };

  computeIsPurchasable = ingredients => {
    const quantities = Object
      .keys(ingredients)
      .map(ingredientType => ingredients[ingredientType]);

    const sumOfQuantities = quantities.reduce((memo, item) => memo + item, 0);

    return sumOfQuantities > 0;
  };

  buildDisableIngredientRemovalMap = () => {
    const map = new Map();

    const { ingredients } = this.state;

    for (const ingredientType of priceLookup.keys()) {
      const ingredientQuantity = ingredients[ingredientType];
      const canRemoveIngredient = (ingredientQuantity !== undefined) && ingredientQuantity > 0;
      const isIngredientRemovalDisabled = !canRemoveIngredient;
      map.set(ingredientType, isIngredientRemovalDisabled);
    }

    return map;
  };

  onBurgerOrdered = () => {
    this.setState({ isPurchaseMode: true });
  };

  onBurgerPurchasingCancelled = () => {
    this.setState({ isPurchaseMode: false });
  }

  onBurgerPurchasingConfirmed = () => {
    alert("Thank you for purchasing our burger!");
  };

  render() {
    const disableIngredientRemovalMap = this.buildDisableIngredientRemovalMap();

    return (
      <Aux>
        <Modal
          onModalClosed={this.onBurgerPurchasingCancelled}
          show={this.state.isPurchaseMode}>
          <OrderSummary
            onOrderCancelled={this.onBurgerPurchasingCancelled}
            onOrderConfirmed={this.onBurgerPurchasingConfirmed}
            ingredients={this.state.ingredients}
            price={this.state.price} />
        </Modal>

        <BurgerPreview ingredients={this.state.ingredients} />

        <BuildControls
          disableIngredientRemovalMap={disableIngredientRemovalMap}
          onIngredientAdded={this.onIngredientAdded}
          onIngredientRemoved={this.onIngredientRemoved}
          price={this.state.price}
          canOrder={this.state.isPurchasable}
          onOrderNowClicked={this.onBurgerOrdered} />
      </Aux>
    );
  }
}

export default BurgerBuilder;