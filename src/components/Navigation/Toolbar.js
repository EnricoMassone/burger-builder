import React from "react";
import PropTypes from "prop-types";
import styles from "./Toolbar.module.css";
import Logo from "../Logo";
import NavigationMenu from "./NavigationMenu";
import SideDrawerToggleButton from "./SideDrawerToggleButton";

const toolbar = props => (
  <header className={styles.Toolbar}>
    <div className={[styles.MobileOnly, styles.FullParentHeight].join(" ")}>
      <SideDrawerToggleButton
        onClick={props.onSideDrawerToggleButtonClick} />
    </div>

    <div className={[styles.Logo, styles.DesktopOnly].join(" ")}>
      <Logo />
    </div>

    <nav className={styles.DesktopOnly}>
      <NavigationMenu />
    </nav>
  </header>
);

toolbar.propTypes = {
  onSideDrawerToggleButtonClick: PropTypes.func.isRequired
};

export default toolbar;