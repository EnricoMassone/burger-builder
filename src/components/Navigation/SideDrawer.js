import React from "react";
import PropTypes from "prop-types";
import styles from "./SideDrawer.module.css";
import Logo from "../Logo";
import NavigationMenu from "./NavigationMenu";
import Backdrop from "../UI/Backdrop";
import Aux from "../../hoc/Auxiliary";

const sideDrawer = props => {
  const sideDrawerContainerClasses = [styles.SideDrawer];

  if (props.isOpen) {
    sideDrawerContainerClasses.push(styles.Open);
  } else {
    sideDrawerContainerClasses.push(styles.Close);
  }

  return (
    <Aux>
      <Backdrop
        show={props.isOpen}
        onClick={props.onBackdropClicked} />

      <div className={sideDrawerContainerClasses.join(" ")}>
        <div className={styles.Logo}>
          <Logo />
        </div>

        <nav>
          <NavigationMenu />
        </nav>
      </div>
    </Aux>
  );
};

sideDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onBackdropClicked: PropTypes.func.isRequired
};

export default sideDrawer;