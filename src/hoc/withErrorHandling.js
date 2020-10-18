import React, {Fragment, useEffect, useState} from 'react';
import Modal from "../components/UI/Modal/Modal";
import styles from './withErrorHandling.css'

const withErrorHandling = (WrappedComponent, axios) => {
    return props => {
        const [error, setError] = useState(null);
        const reqInterceptor = axios.interceptors.request.use(req => {
            return req;
        }, err => {
            if (err) {
                console.log(err);
                setError(err);
            }
            return Promise.reject(err);
        })
        const resInterceptor = axios.interceptors.response.use(res => res, err => {
            if (err) {
                console.log(err);
                setError(err);
            }
            return Promise.reject(err);
        })

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            };
        }, []);

        const clearError = () => {
            setError(null);
        }
        return (
            <Fragment>
                <Modal openModal={!!error} onClick={clearError}>
                    <div className={styles.content}>
                        {error ? error.message : null}
                    </div>
                </Modal>
                <WrappedComponent {...props}/>
            </Fragment>
        )
    }
}

export default withErrorHandling;