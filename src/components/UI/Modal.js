import React, { Component } from "react";
import styles from "./Modal.module.css";
import PropTypes from "prop-types";
import Backdrop from "./Backdrop";
import Aux from "../../hoc/Auxiliary";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const isShowPropChanged = nextProps.show !== this.props.show;
    const areChildrenChanged = nextProps.children !== this.props.children;
    return isShowPropChanged || areChildrenChanged;
  }

  render() {
    const modalContainerClasses = [styles.Modal];

    if (this.props.show) {
      modalContainerClasses.push(styles.Visible);
    } else {
      modalContainerClasses.push(styles.Hidden);
    }

    return (
      <Aux>
        <Backdrop
          show={this.props.show}
          onClick={this.props.onModalClosed} />

        <div className={modalContainerClasses.join(" ")}>
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onModalClosed: PropTypes.func.isRequired
};

export default Modal;