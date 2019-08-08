import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import BurgerPreview from "../../components/Burger/BurgerPreview";
import BuildControls from "../../components/Burger/BuildControls";
import Modal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner";
import withHttpErrorHandling from "../../hoc/withHttpErrorHandling";

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    price: null,
    isPurchasable: false,
    isPurchaseMode: false,
    isPostingOrderToServer: false,
    configuration: null
  };

  async componentDidMount() {
    try {
      const response = await axios.get("/configuration.json");
      const { basePrice, ingredientsPrice } = response.data;

      const ingredientPriceTuples = Object
        .keys(ingredientsPrice)
        .map(ingredient => {
          const price = ingredientsPrice[ingredient];
          return [ingredient, price];
        });
      const priceLookup = new Map(ingredientPriceTuples);

      const configuration = {
        basePrice,
        priceLookup
      };

      this.setState({
        configuration,
        price: basePrice
      });
    } catch (error) {
      console.log(error);
    }
  }

  isStateInitialized = () => {
    const isPriceInitialized = this.state.price !== null;
    const isConfigurationInitialized = this.state.configuration !== null;
    return isPriceInitialized && isConfigurationInitialized;
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
      const ingredientPrice = this.state.configuration.priceLookup.get(item);
      if (ingredientPrice === undefined) {
        throw new Error(`Price for ingredient ${item} is not available`);
      }

      const ingredientQuantity = ingredients[item];

      return memo + (ingredientPrice * ingredientQuantity);
    }, this.state.configuration.basePrice);
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

    for (const ingredientType of this.state.configuration.priceLookup.keys()) {
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

  onBurgerPurchasingConfirmed = async () => {
    this.setState({ isPostingOrderToServer: true });

    try {
      const order = this.buildOrderObject();
      await axios.post("/orders.json", order);
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        isPostingOrderToServer: false,
        isPurchaseMode: false
      });
    }
  };

  buildOrderObject = () => {
    const customer = {
      name: "Mario Rossi",
      email: "mario.rossi@example.com",
      address: {
        city: "Torino",
        zipCode: "12345",
        street: "Test street 123"
      }
    };

    const ingredients = { ...this.state.ingredients };

    return {
      customer,
      ingredients,
      deliveryMethod: "fast-delivery",
      price: this.state.price
    };
  };

  render() {
    const disableIngredientRemovalMap = this.buildDisableIngredientRemovalMap();

    const modalContent = this.state.isPostingOrderToServer ?
      <Spinner /> :
      (
        <OrderSummary
          onOrderCancelled={this.onBurgerPurchasingCancelled}
          onOrderConfirmed={this.onBurgerPurchasingConfirmed}
          ingredients={this.state.ingredients}
          price={this.state.price} />
      );

    return (
      <Aux>
        <Modal
          onModalClosed={this.onBurgerPurchasingCancelled}
          show={this.state.isPurchaseMode}>
          {modalContent}
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

export default withHttpErrorHandling(BurgerBuilder, axios);