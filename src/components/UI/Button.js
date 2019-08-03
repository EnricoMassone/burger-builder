import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

const button = props => {
  const classes = [styles.Button, styles[props.buttonType]].join(" ");

  return (
    <button
      className={classes}
      onClick={props.onClick}>
      {props.children}
    </button>
  );
};

button.propTypes = {
  buttonType: PropTypes.oneOf(["Success", "Danger"]).isRequired,
  onClick: PropTypes.func.isRequired
};

export default button;