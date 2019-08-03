import React from "react";
import PropTypes from "prop-types";
import styles from "./NavigationItem.module.css";

const navigationItem = props => (
  <li className={styles.NavigationItem}>
    <a
      className={props.isActive ? styles.active : null}
      href={props.linkTarget}>
      {props.children}
    </a>
  </li>
);

navigationItem.propTypes = {
  linkTarget: PropTypes.string.isRequired,
  isActive: PropTypes.bool
};

export default navigationItem;