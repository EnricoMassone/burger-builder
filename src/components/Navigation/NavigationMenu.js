import React from "react";
import styles from "./NavigationMenu.module.css";
import NavigationItem from "./NavigationItem";

const navigationMenu = () => (
  <ul className={styles.NavigationMenu}>
    <NavigationItem linkTarget="#" isActive> Burger Builder </NavigationItem>
    <NavigationItem linkTarget="#"> Checkout </NavigationItem>
  </ul>
);

export default navigationMenu;