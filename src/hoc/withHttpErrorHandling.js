import React, { Component } from "react";
import Aux from "./Auxiliary";
import Modal from "../components/UI/Modal";

const withHttpErrorHandling = (WrappedComponent, axios) => (
  class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        httpError: null
      };

      axios.interceptors.request.use(
        request => {
          this.setState({
            httpError: null
          });

          return request;
        }, error => {
          this.setState({
            httpError: error
          });

          return Promise.reject(error);
        }
      );

      axios.interceptors.response.use(
        response => response,
        error => {
          this.setState({
            httpError: error
          });

          return Promise.reject(error);
        }
      );
    }

    onErrorModalClosed = () => {
      this.setState({
        httpError: null
      });
    };

    render() {
      const showErrorModal = !!this.state.httpError;
      const errorModalContent = this.state.httpError ?
        "An error occurred while sending HTTP request" :
        null;

      return (
        <Aux>
          <Modal
            show={showErrorModal}
            onModalClosed={this.onErrorModalClosed}>
            {errorModalContent}
          </Modal>

          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
);

export default withHttpErrorHandling;