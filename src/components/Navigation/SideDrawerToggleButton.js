import React from "react";
import PropTypes from "prop-types";
import styles from "./SideDrawerToggleButton.module.css";

const sideDrawerToggleButton = props => (
  <div
    className={styles.DrawerToggle}
    onClick={props.onClick}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

sideDrawerToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default sideDrawerToggleButton;