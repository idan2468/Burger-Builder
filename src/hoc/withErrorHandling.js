import React, {Component, Fragment} from 'react';
import Modal from "../components/UI/Modal/Modal";
import styles from './withErrorHandling.scss'

const withErrorHandling = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            }, err => {
                if (err) {
                    console.log(err);
                    this.setState({error: err});
                }
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, err => {
                if (err) {
                    console.log(err);
                    this.setState({error: err});
                }
            })
            this.state = {
                error: null,
                reqInterceptor: this.reqInterceptor,
                resInterceptor: this.resInterceptor,
            }
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.state.reqInterceptor);
            axios.interceptors.response.eject(this.state.resInterceptor);
        }

        clearError = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Fragment>
                    <Modal openModal={!!this.state.error} onClick={this.clearError}>
                        <div className={styles.content}>
                            {this.state.error ? this.state.error.message : null}
                        </div>
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Fragment>
            )
        }
    }
}

export default withErrorHandling;