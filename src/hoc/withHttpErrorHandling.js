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

      this.requestInterceptor = axios.interceptors.request.use(
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

      this.responseInterceptor = axios.interceptors.response.use(
        response => response,
        error => {
          this.setState({
            httpError: error
          });

          return Promise.reject(error);
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
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