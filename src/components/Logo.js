import React from "react";
import styles from "./Logo.module.css";
import burgerImage from "../assets/images/burger-logo.png";

const logo = () => (
  <div className={styles.Logo}>
    <img alt="buger logo" src={burgerImage} />
  </div>
);

export default logo;