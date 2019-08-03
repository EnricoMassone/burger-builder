import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import styles from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  closeSideDrawer = () => {
    this.setState({ showSideDrawer: false });
  };

  toggleSideDrawerVisibility = () => {
    this.setState(previousState => ({
      showSideDrawer: !previousState.showSideDrawer
    }));
  };

  render() {
    return (
      <Aux>
        <Toolbar
          onSideDrawerToggleButtonClick={this.toggleSideDrawerVisibility} />

        <SideDrawer
          isOpen={this.state.showSideDrawer}
          onBackdropClicked={this.closeSideDrawer} />

        <main className={styles["main-content"]}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

export default Layout;